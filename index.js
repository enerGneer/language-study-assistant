require("dotenv").config();

const axios = require("axios");
const apiKey = process.env.API_KEY;

const apiUrl = "https://api.openai.com/v1/chat/completions";

const inputText = document.getElementById("inputText");
const processButton = document.getElementById("processButton");
const outputDiv = document.getElementById("output");

// 버튼 클릭 이벤트 핸들러
processButton.addEventListener("click", async () => {
  const userInput = inputText.value;

  if (!userInput) {
    alert("입력된 내용이 없습니다. 텍스트를 입력해주세요.");
    return;
  }

  try {
    const answer = await interactWithChatGPT(userInput);
    // 결과를 HTML 요소에 표시
    outputDiv.textContent = `ChatGPT 응답: ${answer}`;
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    alert("ChatGPT API 요청 실패");
  }
});

async function interactWithChatGPT(userInput) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "받아온 문장에서 일본어 단어를 추출하여 독음과 뜻을 작성해주세요." },
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
    return answer;
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    throw error;
  }
}
