import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user-model";
import generateTokenAndSetCookie from "../utils/generate-token";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Login error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exist!" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate jwt token
      generateTokenAndSetCookie(newUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Signup error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Logout error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
