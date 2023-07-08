import express, { Router } from "express";
// router
import userRouter from "./user";

const router: Router = express.Router();

router.use("/user", userRouter);

export default router;
