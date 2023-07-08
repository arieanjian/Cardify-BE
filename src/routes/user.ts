import express from "express";
// controllers
import userControllers from "@/controllers/user";
// middleware
import userMiddleware from "@/middleware/user";

const router = express.Router();

router.get("/", userControllers.getUser);
router.post("/", userMiddleware.addUser, userControllers.addUser);

export default router;
