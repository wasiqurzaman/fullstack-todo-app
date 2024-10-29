import { Router } from "express";
import { createNewTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from "../controllers/todoController.js";

const router = Router();

router.get("/", getAllTodos);
router.get("/:username", getTodo);
router.post("/", createNewTodo);
router.put("/:username", updateTodo);
router.delete("/:username", deleteTodo);

export default router;