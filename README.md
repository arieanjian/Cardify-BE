## commit message Guidelones

- build: 影響構建系統或外部依賴項的更改（ex: gulp、broccoli、npm）
- ci: 更改我們的 CI 配置文件和腳本（ex: CircleCi、SauceLabs）
- docs: 僅改變文件
- feat: 一項新功能
- fix: 錯誤修正
- perf: 提升性能 or 可讀性之類的程式優化
- refactor: 既不修正錯誤也不添加更能的程式碼
- test: 新增 or 修改測試程式碼。

### express MVC 架構(使用 no view)

```sh
npx express-generator --no-view
```

## 把.js 改成.ts

### 修改 package.json

```js
{
  "name": "express-mongodb",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www.ts"
  },
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "^2.0.0",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "@tsconfig/node16": "^1.0.3",
    "@types/cookie-parser": "^1.4.3",
    "@types/debug": "^4.1.7",
    "@types/express": "^4.17.17",
    "@types/http-errors": "^2.0.1",
    "@typescript-eslint/parser": "^5.59.1",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.4"
  }
}
```

### 加入 tsconfig.json

```typescript
{
  "extends": "@tsconfig/node16/tsconfig.json", // 繼承自 node12 的預設設定，可視需要進行更改
  "compilerOptions": {
  "target": "ES2018", // 編譯成 ES2018 的 JavaScript 代碼
  "module": "commonjs", // 使用 commonjs 模組系統進行編譯
  "lib": ["ES2018", "DOM"], // 編譯時需要使用的 JavaScript 標準庫
  "esModuleInterop": true, // 啟用對 CommonJS 模組進行的 ES 模組互操作性支持
  "resolveJsonModule": true, // 啟用對 JSON 模組的支持
  "sourceMap": true, // 生成對應的 source map 文件，方便除錯
  "preserveConstEnums": true, // 保留 const enum 型別，以減少運行時代碼的大小
  "skipLibCheck": true, // 不進行標準庫檢查，以加快編譯速度
  "strict": true // 啟用所有嚴格的 TypeScript 檢查
  },
  "include": ["./**/*"], // 指定需要進行編譯的檔案或目錄，這裡指定所有的檔案和目錄
  "exclude": ["node_modules", "/*.spec.ts"] // 指定不需要進行編譯的檔案或目錄，這裡排除了 node_modules 目錄和所有 .spec.ts 測試檔案
}
```
