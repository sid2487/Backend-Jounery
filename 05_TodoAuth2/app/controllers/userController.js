import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        token: generateToken(user._id),
    });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
};