import User from "../models/User.js";

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user })
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (err) {
        next(err);
    }
};

export { createUser, getUser }