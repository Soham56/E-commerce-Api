const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
} = require("../errors");
const {
    createTokenPayload,
    attachCookieResponse,
    checkPermissons,
} = require("../utils");

const getAllUsers = async (req, res) => {
    const users = await User.find({ role: "user" }).select("-password -__v");
    res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
    const { id: userId } = req.params;
    checkPermissons(req.user, id);
    const user = await User.findOne({ _id: userId, role: "user" }).select(
        "-password -__v"
    );

    if (!user) {
        throw new NotFoundError("No User Found");
    }
    res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
    return res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError("Please provide name and email");
    }

    // const user = await User.findOneAndUpdate(
    //     { _id: req.user.userId },
    //     { name, email },
    //     { new: true, runValidators: true }
    // ).select("-password -__v");

    const user = await User.findById(req.user.userId);
    user.name = name;
    user.email = email;
    await user.save();

    const payload = createTokenPayload(user);

    attachCookieResponse({ res, user: payload });

    res.status(StatusCodes.CREATED).json({
        msg: "fields updated successfully",
    });
};

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError(
            "Please provide valid Old Password and New Password"
        );
    }

    const { userId } = req.user;
    const user = await User.findById(userId).select("password");
    const isValidPassword = await user.comparePassword(oldPassword);
    if (!isValidPassword) {
        throw new UnauthenticatedError("Old Password Not Matched");
    }

    user.password = newPassword;
    await user.save();
    return res
        .status(StatusCodes.CREATED)
        .json({ msg: "password updated successfully" });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
};
