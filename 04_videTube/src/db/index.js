import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectioInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected ! DB host: ${connectioInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection error", error);
        process.exit(1)
    }
}

export default connectDB 