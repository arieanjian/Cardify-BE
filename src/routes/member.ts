import express from "express";
// controllers
import { default as Controllers } from "@/controllers/Member";
// middleware
import { default as Middleware } from "@/middleware/member";

const router = express.Router();

router.post("/addMember", Middleware.addMember, Controllers.addMember);
router.get("/getMembers", Controllers.getMembers);

export default router;
