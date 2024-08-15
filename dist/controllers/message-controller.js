"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const conversation_model_1 = __importDefault(require("../models/conversation-model"));
const message_models_1 = __importDefault(require("../models/message-models"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        let conversation = yield conversation_model_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = yield conversation_model_1.default.create({
                participants: { $all: [senderId, receiverId] },
            });
        }
        const newMessage = yield message_models_1.default.create({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        return res.status(201).json(newMessage);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.sendMessage = sendMessage;
