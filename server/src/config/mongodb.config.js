import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const MONGO_URI = process.env.MONGO_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to db.");
    } catch (error) {
        console.error(error);
    }
};

export default connectToDB;
