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
exports.logout = exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_models_1 = __importDefault(require("../models/user-models"));
const generate_token_1 = __importDefault(require("../utils/generate-token"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_models_1.default.findOne({ username });
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        (0, generate_token_1.default)(user._id, res);
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log("Login error", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }
        const user = yield user_models_1.default.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exist!" });
        }
        // hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = yield user_models_1.default.create({
            name,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        if (newUser) {
            // Generate jwt token
            (0, generate_token_1.default)(newUser._id, res);
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("Signup error", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signup = signup;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Logout error", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.logout = logout;
