import { adjustTextareaHeight, initialize } from "../src/utils/uiUtils.js";
import { copyResultToClipboard, processUserInput } from "../src/utils/inputHandlers.js";

const processButton = document.getElementById("processButton");
const copyButton = document.getElementById("copyButton");
const inputText = document.getElementById("inputText");

// 초기화 함수 호출
initialize();

// 'inputText' 입력 시 textarea 높이 자동 조절
inputText.addEventListener("input", () => adjustTextareaHeight(inputText));

// 'copyButton' 클릭 시 'copyResultToClipboard' 함수 호출
copyButton.addEventListener("click", copyResultToClipboard);

// 'processButton' 클릭 시 'processUserInput' 함수 호출
processButton.addEventListener("click", processUserInput);
