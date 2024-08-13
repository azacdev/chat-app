import mongoose from "mongoose";
import { Request, Response } from "express";

import Conversation from "../models/conversation-model";
import Message from "../models/message-model";
import { getReceiverSocketId, io } from "../socket/socket";

interface CustomRequest extends Request {
  user?: mongoose.Document;
}

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user?._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // socket io functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sendmessages controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req?.user?._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error: any) {
    console.log("Error in getmessages controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
