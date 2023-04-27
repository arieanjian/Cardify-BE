## commit message Guidelones

- build: 影響構建系統或外部依賴項的更改（ex: gulp、broccoli、npm）
- ci: 更改我們的 CI 配置文件和腳本（ex: CircleCi、SauceLabs）
- docs: 僅改變文件
- feat: 一項新功能
- fix: 錯誤修正
- perf: 提升性能 or 可讀性之類的程式優化
- refactor: 既不修正錯誤也不添加更能的程式碼
- test: 新增 or 修改測試程式碼。

### express MVC 架構

```sh
npx express-generator
```

### 加入 TypeScript

```sh
yarn add -D typescript
```

### 加入 @types/express

```sh
yarn add -D @types/express
```

### 加入 cookie-parser

```sh
yarn add cookie-parser
```

### 加入 @types/cookie-parser

```sh
yarn add @types/cookie-parser -D
```

### 加入 http-errors

```sh
yarn add http-errors
```

### 加入 @types/http-errors

```sh
yarn add @types/http-errors -D
```

### 加入@tsconfig/node16

```sh
yarn add --dev @tsconfig/node16
```

### 加入 @typescript-eslint/parser

```sh
yarn add -D @typescript-eslint/parser
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
