import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connection SUCCESS: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection FAIL", error.message);
        process.exit(1); //1 is failure, 0 is success
    }
}