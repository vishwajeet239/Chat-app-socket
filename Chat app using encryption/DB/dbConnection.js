import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose
  .connect("mongodb://localhost:27017/ChatAppEnc")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));
};

export default connectDB;