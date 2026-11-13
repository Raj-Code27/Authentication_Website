import mongoose from "mongoose";

// making some schema 
const userschema=new mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileimage:{
        type:String,
        required:false
    }
},{timestamps: true})

const user=mongoose.model("user",userschema)

export default user;


