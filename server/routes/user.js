import { Router } from "express";
import { createNewUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/", validateUser, createNewUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;