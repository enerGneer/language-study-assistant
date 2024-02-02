import { processChatGPTRequest } from "../processChatGPTRequest.js"; // 변경된 모듈 경로

export const handler = async (event) => {
  try {
    const userInput = JSON.parse(event.body).userInput;
    const answer = await processChatGPTRequest(userInput); // 변경된 함수 호출
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
