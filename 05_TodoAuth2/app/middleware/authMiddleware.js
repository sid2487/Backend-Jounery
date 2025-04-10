import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        res.status(401);
        throw new Error("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token using the secret key and If valid, it gives us the payload (e.g., { id: userId, iat, exp }).
    req.user = await User.findById(decoded.id).select("-password");
    next(); 
}