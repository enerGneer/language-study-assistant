# Language Study Assistant

## 프로젝트 개요

Language Study Assistant는 언어 학습을 위한 웹 애플리케이션입니다. 사용자가 입력한 문장에서 핵심 단어를 추출하고, 이 단어들의 의미와 사용 예문을 제공하여 언어 학습 과정을 간소화하고 효율화합니다. 이 프로젝트는 AWS Lambda를 활용한 서버리스 백엔드 아키텍처와 GitHub Pages를 통한 프론트엔드 배포, 그리고 GitHub Actions를 이용한 CI/CD 파이프라인 구축을 특징으로 합니다.

## 기능 소개

- **언어 자동 감지**: franc-min 라이브러리를 사용하여 사용자 입력에서 언어를 자동으로 감지합니다. 이를 통해 해당 언어에 맞는 처리를 수행합니다.
- **핵심 단어 추출 및 의미 제공**: 입력된 문장에서 핵심 단어를 추출하고, 해당 단어의 발음기호 및 의미를 제공합니다.
- **사용 예문 제공**: 각 핵심 단어에 대해 사용 예문을 제공함으로써, 단어가 실제 문장에서 어떻게 쓰이는지를 이해할 수 있습니다.
- **다국어 지원**: 다양한 언어의 문장을 처리할 수 있으며, 사용자에게는 감지된 언어에 맞는 응답을 제공합니다.

## 기술 스택

- **Backend**: Node.js, AWS Lambda
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Deployment**: GitHub Pages, AWS Lambda
- **CI/CD**: GitHub Actions
- **Other Libraries**: Axios, franc-min, dotenv

## 설치 및 실행 방법

### 로컬 환경에서 실행하기

```bash
git clone https://github.com/yourusername/gpt-language-learning.git
cd gpt-language-learning
npm install
npm start
```

### AWS Lambda 설정

AWS Lambda 함수를 생성하고, `handler.js`를 기반으로 함수를 설정합니다. 함수 배포 과정을 위해 root에 `lambdaHandler.js` 파일을 두어 `handler.js`를 호출합니다.

### GitHub Actions를 이용한 CI/CD

`deploy.yml` 파일을 `.github/workflows/` 디렉토리에 추가하여 Main 브랜치에 변경 사항이 push될 때마다 프론트엔드가 자동으로 빌드되고 GitHub Pages로 배포됩니다.

## 사용 예시 및 코드 스니펫

### 언어 감지 - franc-min

```javascript
import { franc } from "franc-min";

export const detectLanguage = (text) => {
  const detectedLanguage = franc(text, { minLength: 3 });
  return detectedLanguage;
};
```

### AWS Lambda - 핸들러 함수

```javascript
export const handler = async (event) => {
  try {
    const userInput = JSON.parse(event.body).userInput;
    const answer = await processChatGPTRequest(userInput);
    console.log("ChatGPT API 응답:", answer);
    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    console.error("ChatGPT API 요청 실패:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "ChatGPT API 요청 실패" }),
    };
  }
};
```

### GitHub Actions - 배포 자동화

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## 프로젝트 구조

```
language-study-assistant/
├── .github/
│   └── workflows/
│       └── deploy-to-gh-pages.yml  # GitHub Actions 설정 파일
├── public/
│   ├── index.html                 # 웹 페이지의 HTML 파일
│   ├── main.js                    # 웹 페이지의 주요 JavaScript 파일
│   └── style.css                  # 최종 웹 페이지의 스타일을 정의하는 CSS 파일
├── server/
│   ├── chatGPTModule.js           # ChatGPT 모듈 (언어 감지 및 메시지 포맷팅 기능 포함)
│   ├── languageDetection.js        # 언어 감지 모듈
│   ├── messageFormatting.js        # 메시지 포맷팅 모듈
│   ├── processChatGPTRequest.js   # ChatGPT API 요청 처리 모듈
│   ├── server.js                  # 개발용 Express 서버
│   └── lambda/
│       └── handler.js             # AWS Lambda 핸들러 함수
├── src/
│   ├── dev/
│   │   ├── input.css              # TailwindCSS로 스타일링된 입력 UI용 CSS 파일
│   │   └── output.css             # TailwindCSS로 스타일링된 결과 UI용 CSS 파일
│   ├── utils/
│   │   ├── inputHandlers.js       # 입력 UI 이벤트 핸들링 및 처리 모듈
│   │   └── uiUtils.js             # 사용자 인터페이스(UI) 관련 유틸리티 함수 모듈
├── .env                            # 환경 설정 파일
├── package.json                    # npm 설정 파일
└── README.md                       # 프로젝트 설명

```
