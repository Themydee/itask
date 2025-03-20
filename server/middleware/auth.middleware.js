import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token // using cookies for authentication

    if(!token){
        return res.status(401).json({ error: "Unauthorized: No token Provided"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decoded.userId).select("password")
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}