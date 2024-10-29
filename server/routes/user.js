import { Router } from "express";
import { createNewUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUser);
router.get("/:username", getUser);
router.post("/", createNewUser);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);

export default router;