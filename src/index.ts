import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/userRouter";

dotenv.config();

const app = express();

const PORT = process.env.PORT || "8000";

// 기능 확장 : app.use 사용

// JSON 데이터 파싱 -> request.body에 저장
app.use(express.json());

// URL-encoded 데이터를 저장
// 주소값에 한글을 받아들일 수 있도록 하는 기록
app.use(express.urlencoded({ extended: true }));

// user 경로로 접근 시 -> userRouter 실행
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`서버 작동중 : http://localhost:${PORT}`);
});
