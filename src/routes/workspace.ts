import express from "express";
// controllers
import { default as Controllers } from "@/controllers/workspace";
// middleware
import { default as Middleware } from "@/middleware/workspace";

const router = express.Router();

router.get("/", Controllers.getWorkspace);
router.get("/getByUserId", Controllers.getByUserId);

router.post("/addWorkspace", Middleware.addWorkspace, Controllers.addWorkspace);

export default router;
