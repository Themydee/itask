import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
    let token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.userId).select("-password"); // Exclude password from response
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
