const BASE_WORDS =
  "There are many variations passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour or randomised words which dont look even slightly believable practice speed accuracy keyboard monitor player racetrack champion victory sprint journey focused mindset typing marathon training endurance challenge"
    .split(" ");

const QUOTES = [
  "Success is not final failure is not fatal it is the courage to continue that counts",
  "Believe you can and you are halfway there",
  "The future belongs to those who believe in the beauty of their dreams",
  "Start where you are use what you have do what you can",
  "Great things never come from comfort zones",
  "Dream big and dare to fail",
  "Hardships often prepare ordinary people for an extraordinary destiny",
];

const PUNCTUATION = [".", ",", ";", "!", "?", ":"];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const injectVariant = (word, option) => {
  if (option === "numbers" && Math.random() < 0.3) {
    return `${Math.floor(Math.random() * 900) + 100}`;
  }

  if (option === "punctuation" && Math.random() < 0.3) {
    return `${word}${randomFrom(PUNCTUATION)}`;
  }

  return word;
};

export const generateRaceWords = ({
  mode = "words",
  option = 10,
  wordCount,
  timeDuration,
} = {}) => {
  if (mode === "quote") {
    const quote = randomFrom(QUOTES);
    const repetitions = Math.max(1, Number(option) || 1);
    return quote
      .split(" ")
      .slice(0, repetitions * 20)
      .map((word) => word.trim())
      .filter(Boolean);
  }

  const targetCount =
    wordCount ||
    (mode === "time"
      ? Math.max(30, Math.round((Number(timeDuration) || 30) * 2))
      : Number(option) || 30);

  const words = [];
  while (words.length < targetCount) {
    const baseWord = randomFrom(BASE_WORDS);
    words.push(injectVariant(baseWord.toLowerCase(), option));
  }

  return words;
};

