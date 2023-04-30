import express, { Router } from "express";
import roomRouter from "../routes/rooms";

const router: Router = express.Router();

router.use("/room", roomRouter);

export default router;
