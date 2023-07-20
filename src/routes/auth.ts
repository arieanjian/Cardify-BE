import express from "express";
// controllers
import { default as Controllers } from "@/controllers/auth";
// middleware
import { default as Middleware } from "@/middleware/auth";

const router = express.Router();

router.post("/login", Controllers.login);
router.post("/signUp", Middleware.signUp, Controllers.signUp);

export default router;
