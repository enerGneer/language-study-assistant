import dotenv from "dotenv";
import { requestToChatGPT } from "./chatGPTModule.js"; // 모듈화된 함수 임포트

dotenv.config();

// ChatGPT와의 상호작용 Lambda 핸들러 함수
export const handler = async (event) => {
  try {
    const userInput = JSON.parse(event.body).userInput;
    const answer = await requestToChatGPT(userInput);
    console.log("ChatGPT API 응답:", answer);
    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "ChatGPT API 요청 실패" }),
    };
  }
};
