import express from "express";
// controllers
import { default as Controllers } from "@/controllers/workspace";
// middleware
import { default as Middleware } from "@/middleware/workspace";

const router = express.Router();

router.get("/", Controllers.getWorkspace);
router.post("/", Middleware.addWorkspace, Controllers.addWorkspace);
router.post("/insertMember", Middleware.insertMember, Controllers.insertMember);
router.get("/getMembers", Controllers.getMembers);

export default router;
