import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date,
});

export default mongoose.model("User", userSchema);