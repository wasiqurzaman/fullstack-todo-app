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
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
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
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
    }
  ],
  refreshToken: {
    token: {
      type: String,
      deafult: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.refreshToken;
  }
});

export default mongoose.model("User", userSchema);