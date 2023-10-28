import express, { Router } from "express";
// router
import userRouter from "./user";
import authRouter from "./auth";
import workspaceRouter from "./workspace";
import memberRouter from "./member";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/workspace", workspaceRouter);
router.use("/member", memberRouter);

export default router;
