import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const router = Router();

//Register
router.post("/register", async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ msg: "User Registered Successfully" });
    } catch(error){
        res.status(500).json({ msg: "Server error" });
        console.error("Register endpoint Error in auth: ", error);
    }
});

function generateTokens(userId: string){
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}

//Login
router.post("/login", async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "inavlid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const { accessToken, refreshToken } = generateTokens(user._id.toString());

        // Save Refresh Token in DB
        user.refreshToken=refreshToken;
        await user.save();

        // Send refresh token as HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000 // 7 days
        });

        res.json({ accessToken, refreshToken });
    } catch(error){
        res.status(500).json({ msg: "Server error" });
        console.error("Error in login endpoint in auth: ", error);
    }
});

// Refresh Access Token
router.post("/refresh", async (req: Request, res: Response)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ msg: "No refresh Token" });

        //Verify Token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN as string) as {id: string};

        // Valodate against DB
        const user = await User.findById(decoded.id);
        if(!user || user.refreshToken!==refreshToken) {
            return res.status(401).json({ msg: "Invalid refresh token" });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id.toString());

        // Update refresh token in DB
        user.refreshToken = newRefreshToken;
        await user.save();

        // Reset cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });

        res.json({ accessToken });
    } catch(error){
        res.status(401).json({ msg: "Token expired or invalid" });
        console.error("Error in refresh endpoint in auth: ", error);
    }
});

// Logout
router.post("/logout", async (req: Request, res: Response)=>{
    try {
        const refreshToken=req.cookies.refreshToken;
        if(refreshToken){
            await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
        }

        res.clearCookie("refreshToken");
        res.json({ msg: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
        console.error("Error in logout endpoint in auth: ", error);
    }
});

export default router;