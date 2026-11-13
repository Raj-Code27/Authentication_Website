import jwt from "jsonwebtoken";

const generatetoken=(id)=>{
    // sign will assign a token and that should be stored in token variable  
    let token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})

    return token;
}

export default generatetoken;

