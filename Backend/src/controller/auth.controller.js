import generatetoken from "../db/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


//signup api function 

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, username } = req.body;

    if (![firstname, lastname, email, password, username].every(
      (value) => typeof value === "string" && value.trim()
    )) {
      return res.status(400).json({
        message: "Please send all required details"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
    });
    if (existingUser) {
      return res.status(409).json({
        message: "Email or username is already in use"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      username: normalizedUsername
    });

// generate token using jwt 
    let token=generatetoken(newUser._id);

    // now we have to store that token into cookies 

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT  == "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    return res.status(201).json({
      user: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        username: newUser.username
      }
    });


  } catch (error) {
    console.log("Signup error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or username is already in use"
      });
    }
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

//login api function 
export const login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
            return res.status(400).json({
                message:"Email and password are required"
            })
        }

        // check using email 
        let existuser=await User.findOne({email: email.trim().toLowerCase()});
        if (!existuser){
            return res.status(400).json({
                message:"User not found"
            })
        }
        // compare bcrypt password 
        let match=await bcrypt.compare(password,existuser.password);
        if (!match){
            return res.status(400).json({
                message:"Invalid password"
            })
        }
        let token=generatetoken(existuser._id);

    // now we have to store that token into cookies 

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT  == "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        
        return res.status(201).json({
            user: {
            firstname: existuser.firstname,
            lastname: existuser.lastname,
            email: existuser.email,
            username: existuser.username
            }
        });

    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

// logout api function to clear the cookie and logout the useer 
export const logout=async (req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT  == "production",
            sameSite:"strict"
        });
        res.status(200).json({
            message:"Logout successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message:"internal server error"
        })
    }
}