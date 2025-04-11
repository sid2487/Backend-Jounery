import jwt from "jsonwebtoken";
import { User } from "../models/models.js"

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json({ message: "Token not provide" });

    const token = authHeader.split(" ")[1]; // 	Extracts the token from "Bearer <token>"
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // We are attaching the logged-in user's full info (except password) to the req object.
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized"});
    }
}

/*
in http requst the client sends the headers to provide metadata,like herre (Authorization: Bearer <your_token_here>
) which is basically a string("Bearer eyJhbGciOiJIUzI1NiIsInR..."
) then we split the string by space("Bearer" → [0] and "eyJhbGciOiJIUzI1NiIsInR..." → [1] This is your actual JWT), then verify the jwt token(usually stored in local storage or cookie) by using the secret key(process.env.JWT_SECRET) that was used to sign the token during login/regist, then if token is valid, it gives you back the payload({ id: "user_id_here", iat: ..., exp: ... }
) by decoding the jwt , so decoded.id contains the user's id, thats how we know which user made the request. now we have userid from the toke, we look in the database with that id, tell mongoose don't include the password field in the returned user data, we use await bcoz fidBYId return a promise, we then attach the user to req.user, so the next middleware or rout can use that user info easily(req.user = {
  _id: ...,
  username: ...,
  email: ...,
  // password excluded
}
)



/**
 * 🔐 JWT Authentication Middleware (protect.js)
 *
 * ▶️ What it does:
 * - Reads token from Authorization header: "Bearer <token>"
 * - Verifies token using secret key (JWT_SECRET)
 * - Decodes payload and gets user ID
 * - Fetches user from DB using ID and excludes password
 * - Attaches user to req.user for next route/middleware
 *
 * ✅ Used to protect private routes like:
 *   - Creating posts
 *   - Viewing personal dashboards
 *   - Performing updates, etc.
 *
 * 🔧 Token is usually sent by frontend (stored in localStorage or cookies)
 * in the header like:
 *    Authorization: Bearer <JWT_token_here>
 * 
 * 
 */

