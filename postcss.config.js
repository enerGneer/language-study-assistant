import purgecss from "@fullhuman/postcss-purgecss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    purgecss({
      content: ["./**/*.html"],
    }),
  ],
};
