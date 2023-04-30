import express, { Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./connections";

import indexRouter from "./routes/index";

const app: Application = express();
// 資料庫連線
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

export default app;
