const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const { registerUser, loginUser, myAccount, updateUser } = require("../controllers/userController");
const { validateToken } = require("../middlewares/jwtMiddleware");





// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", validateToken, myAccount); 
router.put("/details", validateToken, updateUser); 

module.exports = router;
