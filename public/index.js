const inputText = document.getElementById("inputText");
const processButton = document.getElementById("processButton");
const outputDiv = document.getElementById("result");

// 모달 열기
function openModal(message) {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "block";
}

// 모달 닫기
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// 버튼 클릭 이벤트 리스너
processButton.addEventListener("click", async () => {
  const userInput = inputText.value;

  if (!userInput) {
    openModal("입력된 내용이 없습니다. 텍스트를 입력해주세요.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/interactWithChatGPT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const answer = data.answer;
      const requestBody = JSON.stringify({ userInput });

      console.log("요청 본문:", requestBody);
      outputDiv.innerHTML = `${answer.replace(/\n/g, "<br>")}`;
    } else {
      console.error("ChatGPT API 요청 실패:", response.statusText);
      alert("ChatGPT API 요청 실패");
    }
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    alert("ChatGPT API 요청 실패");
  }
});

// 모달 닫기 버튼 설정
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// 모달 외부 클릭 시 모달 닫기
window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
});
