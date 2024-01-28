import dotenv from "dotenv";
import axios from "axios";
import { franc } from "franc-min";

dotenv.config();

const apiKey = process.env.API_KEY;
const url = "https://api.openai.com/v1/chat/completions";

// 언어 감지 및 어시스턴트 설정 함수
async function getAssistantMessage(userInput) {
  let assistantMessage;
  const detectedLanguage = franc(userInput, { minLength: 3 });
  if (detectedLanguage === "jpn") {
    assistantMessage =
      "이 문장에서 일본어 단어들만 따로 발췌해서 [일본어 단어 (히라가나) : 한국어 뜻 \n 예문\n \n ] 이런 양식으로 작성해주세요. 예문은 반드시 주어진 언어로 작성해주세요. 모든 예문은 주어진 텍스트를 그대로 발췌하지 말고 활용 사례를 작문해주세요. 예시는 다음과 같습니다. 学習 (がくしゅう) : 학습\n 私は毎日新しい言葉を学習しています。";
  } else {
    assistantMessage =
      "이 문장에서 단어들만 따로 발췌해서 [단어 [발음기호] : 한국어 뜻 \n 예문\n \n ] 이런 양식으로 작성해주세요. 예문은 반드시 주어진 언어로 작성해주세요. 모든 예문은 주어진 텍스트를 그대로 발췌하지 말고 활용 사례를 작문해주세요. 예시는 다음과 같습니다. Benefits [ˈbɛnɪfɪts] : 혜택\nLearning a new language has numerous benefits for personal growth.";
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
            content: "나는 언어 학습자입니다. 이 앱은 텍스트를 입력하면 단어만 따로 발췌해서 단어의 의미와, 주어진 언어로 작성된 예문을 작성해주는 기능을 갖고 있습니다. 예문 작성 시, 주어진 텍스트를 그대로 발췌하지 말고 활용 사례를 작문해주세요.",
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
