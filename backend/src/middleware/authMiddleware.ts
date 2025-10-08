import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
    user?: string;
}

export function auth(req: AuthRequest, res: Response, next: NextFunction){
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token) return res.status(401).json({ msg: "No access token, authorization denied" });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.user = decoded.id; // attach user ID to request
        next();
    } catch (error){
        console.error("Middleware Error: ", error);
        return res.status(401).json({ msg: "Invalid or expired access token" });
    }
}