import axios from "axios";
import dotenv from "dotenv";
import { detectLanguage } from "./languageDetection.js"; // 언어 감지 및 메시지 포맷팅 함수 임포트
import { formatMessage } from "./messageFormatting.js";

dotenv.config();

const apiKey = process.env.API_KEY;
const url = "https://api.openai.com/v1/chat/completions";

// ChatGPT API 요청 함수
export async function requestToChatGPT(userInput) {
  try {
    const detectedLanguage = detectLanguage(userInput); // 언어 감지
    const assistantMessage = formatMessage(detectedLanguage); // 메시지 포맷팅

    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "I'm a language learner. You do the following: a user enters text, you excerpt words from that text, and you tell me what those words mean, as well as example sentences written in the same language as the words.",
          },
          { role: "user", content: userInput },
          { role: "assistant", content: assistantMessage },
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
