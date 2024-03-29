const User = require("../models/user");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { attachCookieResponse, createTokenPayload } = require("../utils");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // is email already present in database
    // option 1 : using unique keyword in model

    // option 2 : create a custom controller
    const isEmailPresentAlready = await User.findOne({ email });
    if (isEmailPresentAlready)
        throw new CustomError.BadRequestError("Email already in use");

    // role defining
    // option 1: you can alter in database to make already present person as admin

    // option 2: first user entering to the database is an admin
    const isFirstUser = (await User.countDocuments({})) === 0;
    const role = isFirstUser ? "admin" : "user";

    const user = await User.create({ name, email, password, role });

    // getting the user data which will be used as a token in jwt
    const payload = createTokenPayload(user);

    //attach a cookie in response object
    attachCookieResponse({ res, user: payload });

    res.status(StatusCodes.CREATED).json({ user: payload });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email)
        throw new CustomError.BadRequestError(
            "Please provide your email and password"
        );

    const user = await User.findOne({ email });
    if (!user)
        throw new CustomError.UnauthenticatedError(
            `No user found using ${email} emailId`
        );

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new CustomError.UnauthenticatedError("Invalid password !");
    }

    // getting the user data which will be used as a token in jwt
    const payload = createTokenPayload(user);

    //attach a cookie in response object
    attachCookieResponse({ res, user: payload });

    res.status(StatusCodes.CREATED).json({ user: payload });
};

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ msg: "user logged out successfully" });
};

module.exports = {
    register,
    login,
    logout,
};
