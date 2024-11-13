//get newsLetters , post newsletter
const asyncHandler = require("express-async-handler");
const Newsletter = require("../model/newsletterModel");

const getNewsletter = asyncHandler(async(req,res)=>{
    try{
        const data = await Newsletter.find({});
        res.send();
    }
    catch(err){
        return res.status(404).json({message: err.message}));
    }
})

const createNewsletter = asyncHandler(async(req, res)=>{

})

module.export = (getNewsletter, createNewsletter)