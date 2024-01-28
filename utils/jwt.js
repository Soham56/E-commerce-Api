const jwt = require("jsonwebtoken");

const generateToken = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
    return token;
};

const attachCookieResponse = ({ res, user }) => {
    const token = generateToken({ payload: user });
    const oneDay = 24 * 60 * 60 * 1000;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
    generateToken,
    isTokenValid,
    attachCookieResponse,
};
