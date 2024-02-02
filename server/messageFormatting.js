export const formatMessage = (detectedLanguage) => {
  let message;
  if (detectedLanguage === "jpn") {
    message =
      "Please extract only the Japanese words from this sentence and write them in the form of [Japanese word (hiragana) : Korean meaning \n example sentence].\n *Remarks on example sentences* 1. The example sentences must be written in Japanese only. 2. For all example sentences, Please do not use the given text as it is, but write your own examples. Examples are as follows. \n学習 (がくしゅう) : 학습\n 私は毎日新しい言葉を学習しています\n\n";
  } else {
    message =
      "Please extract only words from the sentence and write them in the form of [word [phonetic symbol] : Korean meaning \n example sentence]. \n *Remarks on example sentences* 1. The example sentences must be written only in the same language as the words. 2. For all example sentences, please write a use case, not a direct excerpt of the given text. Examples are as follows. \nBenefits [ˈbɛnɪfɪts] : 혜택\nLearning a new language has numerous benefits for personal growth.\n\n";
  }
  return message;
};
