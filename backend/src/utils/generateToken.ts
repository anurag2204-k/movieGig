import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });

  return token;
};

export default generateToken;
