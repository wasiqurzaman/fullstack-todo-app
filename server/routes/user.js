import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = Router();

router.get("/:id", verifyJWT, getUser);
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;