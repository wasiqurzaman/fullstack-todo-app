import { z } from "zod";

const zodTodoSchema = z.object({
  title: z.string({ required_error: "title is required." })
    .min(5, { message: "title must be at least 3 character long" })
    .max(150, { message: "title can not exceed 150 characters" }),
  description: z.string({ required_error: "description is required." })
    .min(5, { message: "descripton must be at least 5 character long" })
    .max(250, { message: "description can not exceed 250 characters" }),
  // status: z.enum(["pending", "in-progress", "complete"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  dueDate: z.string().datetime()
});


export default function validateTodo(req, res, next) {
  try {
    req.body = zodTodoSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ "errors": err.errors });
  }
}

