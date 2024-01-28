const { StatusCodes } = require("http-status-codes");
const { isTokenValid } = require("../utils/jwt");
const { UnauthenticatedError, ForbiddenRouteError } = require("../errors");

const authenticateUser = (req, res, next) => {
    const { token } = req.signedCookies;
    if (!token) {
        throw new UnauthenticatedError("Invalid User Please register");
    }

    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = { name, userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Invalid User Please register");
    }
};

const authorizeAdmin = (...roles) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (!roles.includes(role)) {
            throw new ForbiddenRouteError("Unauthorized to access this route");
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeAdmin };
