import path from "path";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToDB from "./db/connect-to-db";
import authRoutes from "./routes/auth-routes";
import messageRoutes from "./routes/message-routes";
import usersRoutes from "./routes/user-routes";
import { app, server } from "./socket/socket";

const PORT = process.env.PORT || 5000;

dotenv.config();

const dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());

console.log("PATH", path.join(dirname, "../frontend/dist"));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

// app.use(express.static(path.join(dirname, "../frontend/dist")));

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(dirname, "../frontend", "dist", "index.html"));
// });

// console.log("File Path", path.join(dirname, "../frontend/dist"));

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server is listening on port ${PORT}`);
});
