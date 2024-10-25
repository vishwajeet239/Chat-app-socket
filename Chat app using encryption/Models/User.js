import mongoose from "mongoose";
import hashPassword from "../Middleware/hashMiddleware.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save',hashPassword);

const User = mongoose.model('User', userSchema);
export default User;