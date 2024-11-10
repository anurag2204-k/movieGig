import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ error: "Not authorized, token is required" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true } });
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protectRoutes;
