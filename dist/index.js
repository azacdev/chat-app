"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_to_db_1 = __importDefault(require("./db/connect-to-db"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const message_routes_1 = __importDefault(require("./routes/message-routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/messages", message_routes_1.default);
app.listen(PORT, () => {
    (0, connect_to_db_1.default)();
    console.log(`Server is listening on port ${PORT}`);
});
