import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// it runs before protected routes and blocks them if the user is not logged in.
export const protect = async(req, res, next) => {

    let token = req.headers.authorization?.split(" ")[1]; // frontend usually sends the jwt in the authorization header, so we use req.headers.authorization then use split(" ") to break it into ["Bearer", "<token>"] and grab the token part split(" ")[1]

    if(!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Token failed" });
    }
}





/*
🧍  User registers → Data saved in DB

🔐  User logs in → JWT token generated → sent to frontend

🗝️  Token stored in localStorage / cookies

🌐  For every future request to protected route:
- Frontend sends token in Authorization header
    - Middleware verifies token & adds user to request
        - Route controller uses req.user and responds
*/