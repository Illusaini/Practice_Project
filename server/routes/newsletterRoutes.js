const express = require("express");
const router = express.Router();
const {getNewsletter, createNewsletter}=  require("../controllers/newsletterController")
const{jwtMiddlware} = require("../middlewares/jwtMiddleware");

router.get("/",getNewsletter);
router.post("/",jwtMiddlware, createNewsletter);