import { toggleFloatingMessage, toggleLoading } from "./uiUtils.js";

const inputText = document.getElementById("inputText");
const resultContents = document.getElementById("result");
const loading = document.getElementById("loading");

export function copyResultToClipboard() {
  navigator.clipboard
    .writeText(resultContents.textContent)
    .then(() => toggleFloatingMessage("copySuccessMessage", true))
    .catch((err) => console.error("클립보드 복사 실패:", err));
}

export async function processUserInput() {
  let userInput = inputText.value;
  userInput = userInput.replace(/\n/g, "");

  if (!userInput) {
    toggleFloatingMessage("inputRequestMessage", true);
    return;
  }

  toggleLoading(true);
  try {
    const url = "http://localhost:3000/chat";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
    });

    if (response.ok) {
      const data = await response.json();
      resultContents.innerHTML = data.answer.replace(/\n/g, "<br>");
    } else {
      throw new Error(`ChatGPT API 요청 실패: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  } finally {
    toggleLoading(false);
  }
}
