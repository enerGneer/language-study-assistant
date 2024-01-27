import purgecss from "@fullhuman/postcss-purgecss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    purgecss({
      content: ["./**/*.html"],

      // 필요한 경우 CSS 클래스를 올바르게 추출하기 위한 기본 추출기 추가
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
