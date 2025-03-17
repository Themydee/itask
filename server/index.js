import express from 'express';
import bodyParser from 'body-parser';   
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());



const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
    console.error("Error: MONGO_URL is undefined. Check your .env file.");
    process.exit(1); // Stop the server
}

mongoose.connect(MONGOURL).then(() => {
    console.log('Database connected');   
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });   
}).catch((err) => {
    console.log(err);
});