const express = require("express");
const router = express.Router();
const { registerDoctor, getDoctors } = require("../controllers/doctorDetailsController");

// POST route to register a new doctor
router.post("/", registerDoctor);

// GET route to get all doctors
router.get("/", getDoctors);

module.exports = router;