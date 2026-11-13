import express from "express";
import connectdb from "./src/db/db.js";
import dotenv from "dotenv";
import authrouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   credentials: true
// }));
app.use(cors({
    origin: "https://my-project-frontend.vercel.app",
    credentials: true
}));


// middleware for implementing cookie 
app.use(cookieParser());
app.use("/api", authrouter);

app.listen(port,"0.0.0.0", () => {
  connectdb();
  console.log("server is running on port", { port });
});
