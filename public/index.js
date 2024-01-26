const inputText = document.getElementById("inputText");
const processButton = document.getElementById("processButton");
const resultContents = document.getElementById("result");
const modalElement = document.getElementById("inputRequestModal");
const modalContents = document.getElementById("modalContents");
const loading = document.getElementById("loading");

const url = "http://localhost:3000/api/interactWithChatGPT";

function openModal(message) {
  modalElement.classList.remove("hidden");
}

function closeModal() {
  modalElement.classList.add("hidden");
}

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
    openModal();
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

// 모달 닫기 버튼 설정
const closeBtn = document.querySelector("#close");
closeBtn.addEventListener("click", closeModal);

// 모달 바깥 영역 클릭 시 닫기
modalElement.addEventListener("click", (event) => {
  if (event.target === modalElement) {
    closeModal();
  }
});

// 모달 내용 영역 클릭 시 이벤트 전파 방지
modalContents.addEventListener("click", (event) => {
  event.stopPropagation();
});
