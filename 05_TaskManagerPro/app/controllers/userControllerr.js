import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            resizeBy.status(400);
            throw new Error("User already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server Error"});
    }
};

export const loginUser = async (req, res) => {
   try {
       const { email, password } = req.body;
       const user = await User.findOne({ email });

       if (user && (await bcrypt.compare(password, user.password))) {
           res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
               token: generateToken(user._id),
           });
       } else {
           res.status(401);
           throw new Error("Invalid email or password");
       }
   } catch (error) {
    res.status(500).json({ message: error.message || "Server Error"});
   }
};

// admin: get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
}

