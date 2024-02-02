import dotenv from "dotenv";
import axios from "axios";
import { franc } from "franc-min";

dotenv.config();

const apiKey = "process.env.API_KEY";
const url = "https://api.openai.com/v1/chat/completions";

// 언어 감지 및 어시스턴트 설정 함수
async function getAssistantMessage(userInput) {
  let assistantMessage;
  const detectedLanguage = franc(userInput, { minLength: 3 });
  if (detectedLanguage === "jpn") {
    assistantMessage =
      "Please extract only the Japanese words from this sentence and write them in the form of [Japanese word (hiragana) : Korean meaning \n example sentence].\n *Remarks on example sentences* 1. The example sentences must be written in Japanese only. 2. For all example sentences, Please do not use the given text as it is, but write your own examples. Examples are as follows. \n学習 (がくしゅう) : 학습\n 私は毎日新しい言葉を学習しています\n\n";
  } else {
    assistantMessage =
      "Please extract only words from the sentence and write them in the form of [word [phonetic symbol] : Korean meaning \n example sentence]. \n *Remarks on example sentences* 1. The example sentences must be written only in the same language as the words. 2. For all example sentences, please write a use case, not a direct excerpt of the given text. Examples are as follows. \nBenefits [ˈbɛnɪfɪts] : 혜택\nLearning a new language has numerous benefits for personal growth.\n\n";
  }
  return assistantMessage;
}

// ChatGPT API 요청 함수
export async function requestToChatGPT(userInput) {
  try {
    const assistantMessage = await getAssistantMessage(userInput);

    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "I'm a language learner. You do the following: a user enters text, you excerpt words from that text, and you tell me what those words mean, as well as example sentences written in the same language as the words.",
          },
          { role: "user", content: userInput },
          { role: "assistant", content: assistantMessage },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
