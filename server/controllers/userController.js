const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            age: newUser.age,
            gender: newUser.gender,
            bloodGroup: newUser.bloodGroup,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
        },
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id, username: user.firstName },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
});

const myAccount = asyncHandler(async (req, res) => {
    try{
        const {email} = req.body; 

        const user = await User.findById(email);
    
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
    
        res.send({user});
    }catch(err){
        return res.status(403).json({message:"ERRROrR",err});
    }
});

const updateUser = asyncHandler(async (req, res) => {

    const {firstName,lastName, email, password, phoneNumber} = req.body;
    const userId = req.user.userId; 

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
        message: "Profile updated successfully",
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
        },
    });

});

module.exports = { registerUser, loginUser,  myAccount, updateUser };