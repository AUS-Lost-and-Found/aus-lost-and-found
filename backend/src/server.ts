import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import { auth, AuthRequest } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Protected route example
app.get("/api/protected", auth, (req: AuthRequest, res)=>{
    res.json({ msg: "You have access a protected route", user: req.user });
});

// Start server
connectDB().then(()=>{
    app.listen(PORT, ()=>{ console.log(`Server running on port ${PORT}`) });
});