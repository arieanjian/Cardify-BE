import express, { Router } from "express";
// router
import userRouter from "./user";
import authRouter from "./auth";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
