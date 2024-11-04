const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please add your last name"],
    },
    age: {
        type: Number,
        required: [true, "Please add your age"],
    },
    gender: {
        type: String,
        required: [true, "Please add your gender"],
    },
    bloodGroup: {
        type: String,
        required: [true, "Please add your blood group"],
    },
    email: {
        type: String,
        required: [true, "Please add your email"],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please add your phone number"],
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
