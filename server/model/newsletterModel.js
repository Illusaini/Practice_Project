// {
//     title:"";
//     author:"";
//     date:"";
//     imageUrl:"",
//     description:""
// }

const mongoose = require("mongoose");

const newsletterSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter the title"],
    },
    author: {
        type: String,
        required: [true, "enter name of author"],
    },
    date: {
        type: Number,
        required: [true, "Enter date"],
    },
    imageUrl: {
        type: String,
        required: [true, "Pls add image url"],
    },
    description: {
        type: String,
        required: [true, "Please add description"],
    },
    
}, {
    timestamps: true,
});

module.exports = mongoose.model("newsLetter", newsletterSchema);
