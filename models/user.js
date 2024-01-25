const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name must be provided"],
        match: /^[a-zA-Z]+$/,
        maxLength: [50, "so big name hmm 😐"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email must be provided"],
        validate: {
            validator: validator.isEmail,
            message: "{PATH} is not valid",
        },
    },
    password: {
        type: String,
        required: [true, "where is your password ?"],
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: "{VALUE} is not supported",
        },
        default: "user",
    },
});

userSchema.pre("save", async function () {
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
});

userSchema.method.comparePassword = async function (givenPassword) {
    const isValidPassword = await bcrypt.compare(this.password, givenPassword);
    return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
