import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global{
    namespace Express {
        interface Request {
            user: { id: string; username: string };
        }
    }
}

const protectRoutes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ error: "Not authorized, token is required" });
            return ;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            res.status(401).json({ error: "Invalid token" });
            return 
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true } })

        if (!user) {
            res.status(401).json({ error: "User not found" });
            return 
        }

        req.user = user;

        next();
    }
    catch (error: any) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

export default protectRoutes;