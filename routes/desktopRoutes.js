// routes/desktopRoutes.js
import { Router } from "express";
import { loginDesktop } from "../controllers/desktopController.js";

const router = Router();

router.post("/login", loginDesktop);

export default router;
