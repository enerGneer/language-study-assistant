import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { processChatGPTRequest } from "./processChatGPTRequest.js"; // 변경된 모듈 경로

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // 로컬 개발 환경에서 사용할 포트 번호

// CORS 미들웨어를 사용하여 모든 출처로부터의 요청을 허용합니다.
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const answer = await processChatGPTRequest(userInput); // 변경된 함수 호출
    console.log("ChatGPT API 응답:", answer);
    res.status(200).json({ answer });
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    res.status(500).json({ error: "ChatGPT API 요청 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
