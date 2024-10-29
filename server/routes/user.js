import { Router } from "express";
import { createNewUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/", createNewUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;