//FRAMEWORK CONFIGURATION
const express = require('express');
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");

//env file configuration
const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app= express();
app.set('view engine', 'hbs');
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("working");  
});

app.get('/home',(req,res)=>{
    res.render('home',{
        username: "Nitesh",
        posts:"fiana dimkana"
    })
})
app.get('/allusers',(req,res)=>{
    res.render('allusers',{
        data:[{name:"illu", age:19},
            {name:"xyz", age:17}]
    })
})
app.use(errorHandler);

app.listen(port,() => {
    console.log(`Server running on port http://localhost:${port}`);
});