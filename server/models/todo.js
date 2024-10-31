import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [5, "Title must be at least 3 character long"],
    maxLength: [150, "Title can not exceed 150 characters"],
  },
  description: {
    type: String,
    required: [true, "Title is required"],
    minLength: [5, "Descripton must be at least 3 character long"],
    maxLength: [250, "Description can not exceed 250 characters"],
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "complete"],
    default: "pending"
  },
  dueDate: {
    type: Date,

  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium"

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model("Todo", todoSchema);