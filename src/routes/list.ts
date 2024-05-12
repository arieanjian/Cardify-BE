import express from "express";
// controllers
import { default as Controllers } from "@/controllers/list";

const router = express.Router();

router.post("/addList", Controllers.addList);

export default router;