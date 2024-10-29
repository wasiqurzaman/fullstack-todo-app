import { Router } from "express";
import { createNewTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from "../controllers/todoController.js";

const router = Router();

router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.post("/", createNewTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;