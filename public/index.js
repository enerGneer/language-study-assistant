const inputText = document.getElementById("inputText");
const processButton = document.getElementById("processButton");
const resultContents = document.getElementById("result");
const loading = document.getElementById("loading");
const copyButton = document.getElementById("copyButton");
const textarea = document.getElementById("inputText");

const url = "https://altaj32ltsje245bwsrj7jnxgm0iuyks.lambda-url.ap-northeast-1.on.aws/";

// textarea 크기 자동조절
function adjustTextareaHeight() {
  // Reset the height
  textarea.style.height = "auto";
  // Set the height to scroll height to expand as needed
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// 이벤트 리스너 설정
function setupEventListeners() {
  textarea.addEventListener("input", adjustTextareaHeight);
  copyButton.addEventListener("click", copyResultToClipboard);
  processButton.addEventListener("click", processUserInput);
}

// 복사 기능
function copyResultToClipboard() {
  navigator.clipboard
    .writeText(resultContents.textContent)
    .then(() => toggleFloatingMessage("copySuccessMessage", true))
    .catch((err) => console.error("클립보드 복사 실패:", err));
}

// 플로팅 메시지 토글
function toggleFloatingMessage(elementId, show) {
  const element = document.getElementById(elementId);
  if (show) {
    element.classList.remove("opacity-0");
    setTimeout(() => element.classList.add("opacity-0"), 2000);
  } else {
    element.classList.add("opacity-0");
  }
}

// 로딩 표시 토글
function toggleLoading(show) {
  if (show) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
}

// 사용자 입력 처리
async function processUserInput() {
  const userInput = inputText.value;
  if (!userInput) {
    toggleFloatingMessage("inputRequestMessage", true);
    return;
  }

  toggleLoading(true); // 로딩 시작
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
      mode: "cors", // CORS 요청 모드 설정
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
    toggleLoading(false); // 로딩 완료
  }
}

// 초기화
function initialize() {
  adjustTextareaHeight();
  setupEventListeners();
}

initialize();
