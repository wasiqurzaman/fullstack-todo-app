import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"

import Todo from "./models/todo.js"


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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// api 

app.get("/api/todos", async (req, res) => {
  res.send("todos");
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const todo = {
      title,
      description,
      status: status || "pending",
      createdAt: new Date(),
      priority,
    }

    const newTodo = new Todo(todo);

    const savedTodo = await newTodo.save();
    res.json(savedTodo);

  } catch (err) {
    console.log(res.message);
    res.status(403).json({ "error": "something went wrong" });
  }

});

export default app;