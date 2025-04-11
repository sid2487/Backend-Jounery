import mongoose from 'mongoose';
import { Roles } from '../constants/roles.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: Roles.User,
    }
});

export default mongoose.model("User", userSchema);