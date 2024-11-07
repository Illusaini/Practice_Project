const jwt = require('jsonwebtoken');



const createToken = jwt.sign(payload, process.env.PRIVATE_KEY,(err, token)=>{
    if(error){
        console.error("INVALID: ", err.message)
    }
    else{
        console.log(token);
    }
});
const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);
jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded){
    console.log(decoded)
})