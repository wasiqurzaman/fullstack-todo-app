import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"

import Todo from "./models/todo.js"
import UserRoutes from "./routes/user.js";
import TodoRoutes from "./routes/todo.js";


const app = express();

app.use(cors());
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected!`)
  } catch (err) {
    console.log(' Something went wrong. Could not connect to MongoDB!');
    console.log(err.message);
  }
}

connectDB();

app.get("/api", (req, res) => {
  res.send("Welcome to the Todo List API!");
});

// user routes
app.use("/api/users", UserRoutes);
// todo routes
app.use("/api/todos", TodoRoutes);

export default app;