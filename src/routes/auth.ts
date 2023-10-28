import express from "express";
// controllers
import { default as Controllers } from "@/controllers/auth";
// middleware
import { default as Middleware } from "@/middleware/auth";

const router = express.Router();

router.post("/login", Controllers.login);
router.post("/register", Middleware.register, Controllers.register);
router.get("/verifyAuth", Controllers.verifyAuth);

export default router;
