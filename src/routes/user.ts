import express from "express";
// controllers
import { default as Controllers } from "@/controllers/user";
// middleware
import { default as Middleware } from "@/middleware/user";

const router = express.Router();

router.get("/", Controllers.getUser);
router.post("/", Middleware.addUser, Controllers.addUser);
router.patch("/", Middleware.updateUser, Controllers.updateUser);

export default router;
