# Language Study Assistant

[KO](README.md) | JP

## プロジェクト概要

Language Study Assistant は、言語学習を支援するウェブアプリケーションです。ユーザーが入力した文からキーワードを抽出し、これらの単語の意味と使用例を提供することで、言語学習プロセスを簡素化し、効率化します。本プロジェクトは AWS Lambda を用いたサーバーレスのバックエンドアーキテクチャ、GitHub Pages によるフロントエンドのデプロイ、そして GitHub Actions を利用した CI/CD パイプラインの構築を特徴としています。

## 機能紹介

- **言語自動検出**: franc-min ライブラリを用いてユーザーの入力から言語を自動で検出します。これにより該当する言語に適した処理を実行します。
- **キーワード抽出および意味提供**: 入力された文からキーワードを抽出し、それらの単語の発音記号及び意味を提供します。
- **使用例提供**: 各キーワードに対して使用例を提供し、単語が実際の文中でどのように使用されるかを理解できるようにします。
- **多言語対応**: 様々な言語の文を処理可能で、ユーザーには検出された言語に合わせたレスポンスを提供します。

## 改善予定事項

- **多言語対応の強化**: ユーザーのブラウザ言語を自動検出し、その言語でページと API レスポンスを提供するよう条件分岐を追加します。
- **ローディングインジケータの変更**: 現在円形のローディングインジケータを使用していますが、これを進行状況バーに変更することで、作業が進行中であることをユーザーにより明確に伝えます。
- **入力可能文字数の表示**: ユーザーがさらに入力できる文字数を知らせる UI を追加します。
- **モバイル UI の最適化**: モバイルユーザーの体験向上のため、マージンやレイアウトを調整します。
- **入力中の言語の表示**: franc-min ライブラリを使用して、現在入力中の言語を自動検出し、表示します。言語検出に失敗した場合、API 呼び出しを行わないようにします。
- **結果共有機能の追加**: ユーザーが結果を容易に共有できるよう、共有ボタンを設置します。

## インストールおよび実行方法

### ローカル環境での実行

プロジェクトをローカル環境で実行する方法については、具体的なステップが記載されていません。以下は一般的な Node.js プロジェクトの実行手順です。

```bash
# プロジェクトのクローン
git clone https://github.com/yourusername/language-study-assistant.git
cd language-study-assistant

# 依存関係のインストール
npm install

# アプリケーションの実行
npm start
```

### AWS Lambda の設定

AWS Lambda 関数を作成し、`handler.js`をベースに関数を設定します。関数のデプロイプロセスのために、ルートディレクトリに`lambdaHandler.js`ファイルを配置し、`handler.js`を呼び出します。

### GitHub Actions による CI/CD

`deploy.yml`ファイルを`.github/workflows/`ディレクトリに追加し、Main ブランチに変更がプッシュされるたびにフロントエンドが自動的にビルドされ、GitHub Pages にデプロイされるようにします。

## 使用例およびコードスニペット

言語検出や AWS Lambda のハンドラー関数、GitHub Actions による自動デプロイに関する具体的なコードスニペットが記載されていません。以下は、これらの機能を実装する際の一般的なアイデアを示す架空のコードスニペットです。

### 言語検出

```javascript
// francライブラリを使用して言語を検出する関数
const detectLanguage = (text) => {
  const franc = require("franc");
  return franc(text);
};
```

### AWS Lambda - ハンドラー関数

```javascript
// AWS Lambdaでのハンドラー関数の例
exports.handler = async (event) => {
  const detectedLanguage = detectLanguage(event.text);
  // ロジックの実装...
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success", language: detectedLanguage }),
  };
};
```

### GitHub Actions - 自動デプロイ

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

## プロジェクト構造

プロジェクト構造についての具体的な説明はありませんが、一般的なプロジェクトのディレクトリ構造を想定して以下に示します。

```
language-study-assistant/
├── .github/
│   └── workflows/
│       └── deploy-to-gh-pages.yml  # GitHub Actionsの設定ファイル
├── public/
│   ├── index.html                 # ウェブページのHTMLファイル
│   ├── main.js                    # ウェブページのメインJavaScriptファイル
│   └── style.css                  # ウェブページのスタイルを定義するCSSファイル
├── server/
│   ├── chatGPTModule.js           # ChatGPTモジュール（言語検出およびメッセージフォーマット機能含む）
│   ├── languageDetection.js       # 言語検出モジュール
│   ├── messageFormatting.js       # メッセージフォーマットモジュール
│   ├── processChatGPTRequest.js   # ChatGPT APIリクエスト処理モジュール
│   ├── server.js                  # 開発用のExpressサーバー
│   └── lambda/
│       └── handler.js             # AWS Lambdaハンドラ関数
├── src/
│   ├── dev/
│   │   ├── input.css              # TailwindCSSを使用した入力UI用のCSSファイル
│   │   └── output.css             # TailwindCSSを使用した結果UI用のCSSファイル
│   ├── utils/
│   │   ├── inputHandlers.js       # 入力UIイベントのハンドリングと処理モジュール
│   │   └── uiUtils.js             # ユーザーインターフェース（UI）関連のユーティリティ関数モジュール
├── .env                            # 環境設定ファイル
├── package.json                    # npm設定ファイル
└── README.md                       # プロジェクト説明

```
