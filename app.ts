import express, { Application } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./connections";
// routes
import indexRouter from "./routes/index";
import roomRouter from "./routes/rooms";

const app: Application = express();
// 資料庫連線
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/rooms", roomRouter);

export default app;
