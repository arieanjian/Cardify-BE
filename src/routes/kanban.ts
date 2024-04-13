import express from "express";
// controllers
import { default as Controllers } from "@/controllers/kanban";

const router = express.Router();

router.post("/addKanban", Controllers.addKanban);
router.post("/pinned", Controllers.pinned);
router.get("/getKanbans", Controllers.getKanbans);

export default router;
