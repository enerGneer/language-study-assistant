require("dotenv").config();

const url = "https://api.openai.com/v1/chat/completions";

const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Cross-Origin Resource Sharing 미들웨어
const franc = require("franc-min"); // franc-min 라이브러리 추가

const app = express();
const apiKey = process.env.API_KEY; // 환경 변수에서 API 키 가져오기

app.use(express.static("public"));
app.use(express.json()); // 요청 본문을 JSON으로 파싱하는 미들웨어
app.use(cors()); // CORS 설정

app.post("/api/interactWithChatGPT", async (req, res) => {
  try {
    // 요청 본문을 JSON으로 파싱하여 데이터 추출
    const userInput = req.body.userInput;

    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "나는 일본어 학습자야. 이 문장에서 일본어 단어들만 따로 발췌해서 [일본어 단어 : 히라가나 독음, 한국어 뜻, 예문] 이런 양식으로 작성해줘.모든 예문은 주어진 텍스트를 그대로 발췌하지 말고 활용 사례를 작문해줘.",
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

    const answer = response.data.choices[0].message.content;
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
