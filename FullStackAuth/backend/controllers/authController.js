import { User } from "../models/models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExist = await User.findOne({ username });
        if(userExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });

        res.status(201).json({
            token: generateToken(user._id),
            username: user.username,
        });

    } catch (err) {
        res.status(500).json({ message: err.message || "Server Error" });
    }

};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                token: generateToken(user._id),
                username: user.username,
            });
        } else {
            res.status(401).json({ message: "invalid username or password" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || "Server Error" });
    }
};

export const dashboard = (req, res) => {
    res.json({ 
        message: `Welcome to your dashboard, ${req.user.username}!`,
        user: {
            id: req.user._id,
            username: req.user.username
        } 
    });
}