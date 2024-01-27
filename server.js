import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";
import { franc } from "franc-min";

const app = express();
const apiKey = process.env.API_KEY;
const url = "https://api.openai.com/v1/chat/completions";

app.use(express.static("public"));
app.use(express.json()); // 요청 본문을 JSON으로 파싱하는 미들웨어
app.use(cors()); // CORS 설정

// 언어 감지 및 시스템 메시지 설정 함수
async function getSystemMessage(userInput) {
  const detectedLanguage = franc(userInput, { minLength: 3 });
  if (detectedLanguage === "jpn") {
    return "나는 일본어 학습자야. 이 문장에서 일본어 단어들만 따로 발췌해서 [일본어 단어 : 히라가나 독음, 한국어 뜻, 예문] 이런 양식으로 작성해줘. 모든 예문은 주어진 텍스트를 그대로 발췌하지 말고 활용 사례를 작문해줘.";
  } else {
    return "나는 언어 학습자야. 이 문장에서 단어들만 따로 발췌해서 [단어 : 발음기호, 한국어 뜻, 예문] 이런 양식으로 작성해줘. 모든 예문은 주어진 텍스트를 그대로 발췌하지 말고 활용 사례를 작문해줘.";
  }
}

// ChatGPT API 요청 함수
async function requestToChatGPT(userInput) {
  try {
    const systemMessage = await getSystemMessage(userInput);

    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          { role: "user", content: userInput },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

app.post("/api/interactWithChatGPT", async (req, res) => {
  try {
    // 요청 본문을 JSON으로 파싱하여 데이터 추출
    const userInput = req.body.userInput;
    const answer = await requestToChatGPT(userInput);
    console.log("ChatGPT API 응답:", answer);
    res.json({ answer }); // JSON 형식의 응답 데이터를 보냄
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    res.status(500).json({ error: "ChatGPT API 요청 실패" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
