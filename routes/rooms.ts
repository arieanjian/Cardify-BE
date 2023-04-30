import express, { Request, Response, NextFunction, Router } from "express";
import Room, { IRoom } from "../models/room";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const rooms = await Room.find();
  res.status(200).json({ rooms });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const newRoom = await Room.create(req.body);
  res.status(200).json({ msg: "新增成功", data: newRoom });
});

export default router;
