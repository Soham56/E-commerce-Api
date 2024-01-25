const jwt = require("jsonwebtoken");

const generateToken = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
    return token;
};

const isTokenValid = ({ token }) =>
    jwt.verify(token, process.env.JWT_EXPIRESIN);

module.exports = {
    generateToken,
    isTokenValid,
};
