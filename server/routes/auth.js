import { Router } from "express";
import { handleSignin, handleSignup, handleSignout } from "../controllers/authController.js";
import validateUser from "../middlewares/validateUser.js";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

const router = Router();

router.post("/signup", validateUser, handleSignup);
router.post("/signin", handleSignin);
router.get("/signout", handleSignout);
router.get("/refresh-token", handleRefreshToken);


export default router;