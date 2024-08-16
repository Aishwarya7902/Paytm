const {JWT_SECRET}=reqire("./config");
const jwt=require('jsonwebtoken');

function authMiddleware(req,res,next){
    // Get the Authorization header
    const authHeader=req.headers['authorization'];

    // Check if the header is present and starts with 'Bearer '

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message:"Forbidden:No token provided or invalid format"
        })
    }

    // If header is valid extract it 
const token=authHeader.split('')[1];
try{
    //verify token using secret

    const decoded=jwt.verify(token,JWT_SECRET);
    // attach userId to the request object

    req.userId=decoded.userId;
    //proceed to next middleware or route handler
    next();
}
catch(error){
 // if token is invalid .....return 403 status
 res.status(403).json({
    message:"Forbidden:Invalid token"
 })
}


}

module.exports={
    authMiddleware
}