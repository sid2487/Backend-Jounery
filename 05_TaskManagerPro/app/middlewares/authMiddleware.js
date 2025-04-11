import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, not token");
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Token failed");
    }
};

export const isAdmin = (req, res, next) => {
    if(req.user.role != "admin") {
        res.status(403);
        throw new Error("Admin access only");
    }
    next();
}