import { Request, Response } from "express";

import Room, { IRoom } from "../models/room";

const getRoom = async (_: Request, res: Response) => {
  const rooms = await Room.find();
  res.status(200).json({ rooms });
};

const addRoom = async (req: Request, res: Response) => {
  const newRoom = await Room.create(req.body);
  res.status(200).json({ msg: "新增成功", data: newRoom });
};

export default {
  getRoom,
  addRoom,
};
