export function initialize() {
  const textarea = document.getElementById("inputText");
  adjustTextareaHeight(textarea);
}

export function adjustTextareaHeight(textarea) {
  textarea.style.height = "112px";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export function toggleLoading(show) {
  const loading = document.getElementById("loading");
  if (show) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
}

export function toggleFloatingMessage(elementId, show) {
  const element = document.getElementById(elementId);
  if (show) {
    element.classList.remove("opacity-0");
    setTimeout(() => element.classList.add("opacity-0"), 2000);
  } else {
    element.classList.add("opacity-0");
  }
}
