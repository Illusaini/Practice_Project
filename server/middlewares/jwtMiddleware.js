const jwt = require('jsonwebtoken');

const generateToken = (userData) =>{
    // In this function we are creating a new/fesh jwt
    // token to provide user for Login/session management or for authorization purpose
    return jwt.sign(userData,  process.env.PRIVATE_KEY)
}
const validateJwtToken =( req,res, next)=>{
    // First we are checking that jwt token is available or not
    const authorization = req.header.authorization;

    //Output: 1. Bearer string 
    //Output2 :  xhsxugbeskjb
    //Output3 :noting 
    //output4 : TOKEN BANA HE NHI HIA , LOCAL HO YA WITHOUT TOKEN ERROR SEND KRNA HAI
    if(!authorization){
        return res.status(401).json({err: "Token not available"});
    }
    // we are storing the token value from headers and spliting to get the error  "Bearer xyz.abc.kjh" to "xyz.abc.kjh"
    const token = req.headers.authorization.split(' ')[1];

    // Token provided is wrong, throw error message unauthorized user
    if(!token){
        return res.status(401).json({err: 'Unauthorized User'});
    }
    try{

        //In this Error Handler Try Catch: we are handling , if token is validated or verified, then move to next middleware or response back to client
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);
        res.user = validateToken;
        next();
    }
    catch(error){
        console.error("Error Occured: ", err.message);
    }
};
module.export = {generateToken, validateJwtToken};
