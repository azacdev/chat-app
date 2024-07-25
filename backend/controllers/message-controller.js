import Conversation from "../models/conversation-model";
import Message from "../models/message-models";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: { $all: [senderId, receiverId] },
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
