import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user-model";

interface CustomRequest extends Request {
  user?: mongoose.Document;
}

const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorised - No Token Provided" });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const decoded: any = jwt.verify(token, secret);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
