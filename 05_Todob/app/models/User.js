import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    emai: String, 
});

export default mongoose.model("User", userSchema);