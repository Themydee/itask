import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        console.log("userAlreadyExists:", userAlreadyExists);

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Correct instantiation of the User model
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        await user.save();

        // Return success response (excluding password)
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);  // Log error for debugging

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        } 

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true, 
            message: "User logged in successfully", 
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error){
        console.log("Login Error:", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

export const logout = async (req, res) => {
    res.status(200).json({ success: true, message: "User logged out" });
}

