import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user-model";

interface CustomRequest extends Request {
  user?: mongoose.Document;
}

export const getSidebarUsers = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.error("Error in getSidebarUsers:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
