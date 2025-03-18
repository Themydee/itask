import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
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

