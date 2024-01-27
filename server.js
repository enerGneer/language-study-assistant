import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { requestToChatGPT } from "./chatGPTModule.js"; // 모듈화된 함수 임포트

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// ChatGPT와의 상호작용 라우트
app.post("/api/interactWithChatGPT", async (req, res) => {
  try {
    const userInput = req.body.userInput;
    const answer = await requestToChatGPT(userInput);
    console.log("ChatGPT API 응답:", answer);
    res.json({ answer });
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    res.status(500).json({ error: "ChatGPT API 요청 실패" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
