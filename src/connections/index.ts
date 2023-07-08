import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.join(__dirname, "../config.env"),
});

// 資料庫位置
const database: string = (process.env.DATABASE as string).replace(
  "<password>",
  process.env.PASSWORD as string
);
// 連接資料庫
export const connectDB = async (): Promise<void> => {
  try {
    console.log("----- 資料庫連線中 ... -----");
    await mongoose.connect(database);
    console.log("----- 資料庫連線成功 -----");
  } catch (error) {
    console.error("----- 資料庫連線失敗 -----", error);
  }
};
