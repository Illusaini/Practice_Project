const mongoose=require("mongoose");

const connectDb=async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected: ",connect.connection.host,connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1); //terminate the process imediately , 0 for success and 1 for failure
    }
};
module.exports=connectDb;