const { ForbiddenRouteError } = require("../errors");

const checkPermissons = (currentUser, requestedUserId) => {
    if (currentUser.role === "admin") return;
    if (currentUser.userId === requestedUserId) return;

    throw new ForbiddenRouteError("Unauthorized to access this route !");
};

module.exports = checkPermissons;
