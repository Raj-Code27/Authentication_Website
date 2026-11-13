import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";

// first cretaing a router here 
const authrouter=express.Router()



// building a route for signup 
authrouter.post("/signup",signup)


// building a route for login 
authrouter.post("/login",login)
//logout route 
authrouter.post("/logout",logout);

export default authrouter

