const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser
} = require("../controllers/userController");

// Route to register a user
router.post("/", registerUser);
// Route to login a user
router.post("/login", loginUser);

module.exports = router;
