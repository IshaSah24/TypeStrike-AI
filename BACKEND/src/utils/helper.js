import jsonwebtoken from  'jsonwebtoken';
import  {TokenOptions}  from "../config/cookieOptions.js";


export const  signToken = (payload)=>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET,TokenOptions());
}

export const  verifyToken = (token) =>{
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}