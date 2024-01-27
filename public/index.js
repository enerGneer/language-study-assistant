const inputText = document.getElementById("inputText");
const processButton = document.getElementById("processButton");
const resultContents = document.getElementById("result");
const modalContents = document.getElementById("modalContents");
const loading = document.getElementById("loading");

const url = "http://localhost:3000/api/interactWithChatGPT";

// textarea 크기 자동조절
// Select the textarea element
const textarea = document.getElementById("inputText");

// Function to adjust the height
function adjustHeight() {
  // Reset the height
  textarea.style.height = "auto";
  // Set the height to scroll height to expand as needed
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// Add event listener for input event
textarea.addEventListener("input", adjustHeight);

// Adjust height initially
adjustHeight();

// 복사 기능
function copyResultToClipboard() {
  // 결과 텍스트를 가져옴
  const resultText = resultContents.textContent;

  // Clipboard API를 사용하여 결과 텍스트를 클립보드에 복사
  navigator.clipboard
    .writeText(resultText)
    .then(function () {
      // 복사 성공 시 플로팅 메시지 표시
      const copySuccessMessage = document.getElementById("copySuccessMessage");
      copySuccessMessage.classList.remove("opacity-0"); // 투명도를 0에서 1로 변경하여 나타남

      // 2초 후에 플로팅 메시지 숨김
      setTimeout(function () {
        copySuccessMessage.classList.add("opacity-0"); // 투명도를 1에서 0으로 변경하여 사라짐
      }, 2000);
    })
    .catch(function (err) {
      // 복사 실패 시 오류 메시지 출력
      console.error("클립보드 복사 실패:", err);
    });
}

// 복사 버튼 요소 가져오기
const copyButton = document.getElementById("copyButton");

// 복사 버튼에 클릭 이벤트 리스너 추가
copyButton.addEventListener("click", copyResultToClipboard);

// 로딩 시작
function showLoading() {
  loading.classList.remove("hidden");
}

// 로딩 완료
function hideLoading() {
  loading.classList.add("hidden");
}

// 버튼 클릭 이벤트 리스너
processButton.addEventListener("click", async () => {
  const userInput = inputText.value;

  if (!userInput) {
    // 입력된 내용이 없을 때 inputRequestMessage를 나타나도록 설정
    const inputRequestMessage = document.getElementById("inputRequestMessage");
    inputRequestMessage.classList.remove("opacity-0"); // 투명도를 0에서 1로 변경하여 나타남
    // 2초 후에 플로팅 메시지 숨김
    setTimeout(function () {
      inputRequestMessage.classList.add("opacity-0"); // 투명도를 1에서 0으로 변경하여 사라짐
    }, 2000);
    return;
  }

  showLoading(); // 로딩 시작

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const answer = data.answer;
      resultContents.innerHTML = `${answer.replace(/\n/g, "<br>")}`;
    } else {
      console.error("ChatGPT API 요청 실패:", response.statusText);
      alert("ChatGPT API 요청 실패");
    }
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    alert("ChatGPT API 요청 실패");
  } finally {
    hideLoading(); // 로딩 완료
  }
});
