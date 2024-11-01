import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser";

import UserRoutes from "./routes/user.js";
import TodoRoutes from "./routes/todo.js";
import AuthRoutes from "./routes/auth.js";

import verifyJWT from "./middlewares/verifyJWT.js";
import requestLogger from "./middlewares/logger.js";
import corsOptions from "./configs/corsOptions.js";
import path from "path";

const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

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


// auth routes
app.use("/api/auth", AuthRoutes);

// user routes
app.use("/api/users", UserRoutes);
// todo routes
app.use("/api/todos", verifyJWT, TodoRoutes);

export default app;