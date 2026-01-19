import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMe, updateMe } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/update", authMiddleware, updateMe);

export default router;
