import express, { Application } from "express";

import { connectDB } from "./connections";
import cookieParser from "cookie-parser";
import cors from "cors";
// cors
import corsOptions from "@/config/cors";
// util
import createResponse from "./util/createResponse";
import path from "path";
// routes
import routes from "@/routes";
// middleware
import verifyAuth from "@/middleware/verifyAuth";

const app: Application = express();
// 資料庫連線
connectDB();
// connectDB().then(() => console.log("run socket"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, _, next) => {
//   console.log(`正在調用的 API: ${req.url}`);
//   next();
// });

// 驗證 token
app.use((req, res, next) => {
  verifyAuth(req, res, next);
});

app.use("/", routes);

app.use((_, res, __) => {
  return createResponse(res, 404, "router未匹配");
});

export default app;
