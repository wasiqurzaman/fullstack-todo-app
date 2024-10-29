import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [4, "Username must be at least 4 character long."],
    maxLength: [20, "Username can not exceed 20 characters."]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  createdAt: {
    type: Date,
    deafult: Date.now
  }
});

export default mongoose.model("User", userSchema);