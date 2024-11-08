const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware").validateJwtToken;
const {
    registerUser,
    loginUser
} = require("../controllers/userController");

// Route to register a user (does not require authentication)
router.post("/", registerUser);

// Route to login a user (does not require authentication)
router.post("/login", loginUser);


module.exports = router;
