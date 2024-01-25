const mongoose = require("mongoose");

const connecDb = (mongoUri) => {
    return mongoose.connect(mongoUri);
};

module.exports = connecDb;
