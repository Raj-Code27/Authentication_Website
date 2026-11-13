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

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://authentication-website-kappa.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


// middleware for implementing cookie 
app.use(cookieParser());
app.use("/api", authrouter);

app.listen(port,"0.0.0.0", () => {
  connectdb();
  console.log("server is running on port", { port });
});
