import { requestToChatGPT } from "./chatGPTModule.js"; // 기존의 모듈화된 함수 임포트

export async function processChatGPTRequest(userInput) {
  const answer = await requestToChatGPT(userInput);
  return answer;
}
