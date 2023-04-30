### 載入 mongoose and mongoose 型別

```sh
yarn add mongoose
yarn add @types/mongoose -D
```

### 載入 dotenv

```sh
yarn add dotenv -D
```

### 在根目錄建立 config.env(重要資訊都在這，所以要加入 ignore)

```sh
touch config.env
```

### dotenv 使用方式

```js
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../config.env"),
});

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
```

### 連線資料庫

```js
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "../config.env"),
});

/*
  * database路徑可以是雲端也可以是地端
  * 雲端: 點選資料庫的connect取得資料庫位置(須自行replace密碼)
*/

// 資料庫位置
const database: string = (process.env.DATABASE as string).replace(
  "<password>",
  process.env.PASSWORD as string
);
// 連接資料庫
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(database);
    console.log("----- 資料庫連線成功 -----");
  } catch (error) {
    console.error("----- 資料庫連線失敗 -----", error);
  }
};
```
