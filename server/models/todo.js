import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueDate: Date,
  priority: String,
  createdAt: Date,
  updatedAt: Date
});

export default mongoose.model("Todo", todoSchema);