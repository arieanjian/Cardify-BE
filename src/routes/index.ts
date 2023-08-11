import express, { Router } from "express";
// router
import userRouter from "./user";
import authRouter from "./auth";
import workspaceRoute from "./workspace";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/workspace", workspaceRoute);

export default router;
