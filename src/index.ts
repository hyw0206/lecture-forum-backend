import dotenv from "dotenv";
import express from "express";

// env 환경설정 불러오기
dotenv.config();

// 백엔드를 구성하는 앱 만들기
const app = express();

const PORT = process.env.PORT || "8000";

// app 구동
app.listen(PORT, () => {
  console.log(`서버 작동중 : http://localhost:${PORT}`);
});
