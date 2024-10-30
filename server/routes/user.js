import { Router } from "express";
import { createNewUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/userController.js";
import validateUser from "../middlewares/validateUser.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = Router();

// router.get("/", getAllUser);
router.get("/:id", verifyJWT, getUser);
router.post("/", validateUser, createNewUser);
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;