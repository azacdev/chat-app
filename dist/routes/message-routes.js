"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message-controller");
const protect_route_1 = __importDefault(require("../middlewares/protect-route"));
const router = express_1.default.Router();
router.post("/send/:id", protect_route_1.default, message_controller_1.sendMessage);
exports.default = router;
