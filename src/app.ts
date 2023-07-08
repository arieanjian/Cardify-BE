import express, { Application } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./connections";
// routes
import routes from "@/routes";
// middleware
import verifyToken from "@/middleware/verifyToken";

const app: Application = express();
// 資料庫連線
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, _, next) => {
  console.log(`正在調用的 API: ${req.url}`);
  next();
});

// 驗證 token
app.use((req, res, next) => {
  verifyToken(req, res, next);
  // next();
});

app.use("/", routes);

export default app;
