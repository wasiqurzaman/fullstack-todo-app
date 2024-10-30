import Todo from "../models/todo.js";
import User from "../models/user.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    if (!todos) return res.status(400).json({ "message": "No todos found." });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ "message": `${err.message}` });
  }
}

const getTodo = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ "message": "id is required." });
    const todo = await Todo.findOne({ _id: id, userId: req.user._id }).exec();
    if (!todo) {
      return res.status(400).json({ message: `No todo with id: ${id} is found.` })
    }
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` })
  }
}

const createNewTodo = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority } = req.body;
    if (!title || !description || !priority || !dueDate) return res.status(400).json({ "message": "title, description, priority and dueDate are required." })

    const todo = await Todo.create({
      title,
      description,
      status: status || "pending",
      dueDate,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: req.user._id,
    });

    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": "Something went wrong. Todo can not be created.", "error": `${err.message}` })
  }
}

const updateTodo = async (req, res) => {
  try {
    const id = req.params?.id;
    const { title, description, status, dueDate, priority } = req.body;
    if (!id) return res.status(400).json({ "message": "id is required." });
    const todo = await Todo.findOne({ _id: id, userId: req.user._id }).exec();

    if (!todo) return res.status(400).json({ "message": `Todo with id: ${id} not found.` });

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status) todo.status = status;
    if (dueDate) todo.dueDate = dueDate;
    if (priority) todo.priority = priority;
    todo.updatedAt = new Date();

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ "message": "id parameter is requires." })
    const todo = await Todo.findOne({ _id: id, userId: req.user._id }).exec();
    if (!todo) return res.status(400).json({ "message": `Todo with id: ${id} not found.` });

    const deletedTodo = await todo.deleteOne({ _id: id });
    res.json(deletedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}

export { getAllTodos, getTodo, createNewTodo, updateTodo, deleteTodo };