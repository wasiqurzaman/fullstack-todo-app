import { z } from "zod";

const zodUserSchema = z.object({
  username: z.string({ required_error: "Username is required." })
    .min(4, { message: "Username must be at least 4 characters loong." })
    .max(20, { message: "Username can not exceed 20 characters" }),
  email: z.string({ required_error: "Email is required." })
    .email({ message: "Invalid email adress." }),
  password: z.string()
    .min(8, { message: "Password must be at least 4 characters loong." })
    .max(16, { message: "Password cannot exceed 16 characters." })
});


export default function validateUser(req, res, next) {
  try {
    req.body = zodUserSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ "errors": err.errors });
  }
}

