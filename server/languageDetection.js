import { franc } from "franc-min";

/**
 * Detect the language of the given text.
 * @param {string} text The text to detect the language for.
 * @returns {string} The ISO 639-3 language code.
 */
export const detectLanguage = (text) => {
  // franc를 사용하여 텍스트의 언어 감지
  const detectedLanguage = franc(text, { minLength: 3 });
  return detectedLanguage; // ISO 639-3 언어 코드 반환
};
