import express from "express";

import RoomController from "../controllers/room";

const router = express.Router();

router.get("/", RoomController.getRoom);
router.post("/", RoomController.addRoom);

export default router;
