import { useEffect, useRef } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import { checkLetterColor } from "../utils/checkLetterColor";
import "../styles/Word.css";

export const Word = ({ word, wordID, wordCount, wordHighlighter, input }) => {
  const scrollToWord = useRef(null);

  useEffect(() => {
    const backgroundColor = scrollToWord.current.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollToWord.current.scrollIntoView({
        behavior: "smooth",
      });
      const { offsetTop, offsetLeft, offsetWidth } = scrollToWord.current;
      wordHighlighter(offsetTop, offsetLeft, offsetWidth, 49);
    }
  }, [wordCount, word]);

  return (
    <span
      className="words"
      ref={scrollToWord}
      style={{
        color: checkWordColor(word),
        backgroundColor: wordCount === wordID ? "rgba(0, 0, 0, 0.01)" : "",
      }}
    >
      {word.text.split("").map((letter, letterID) => (
        <span
          style={{
            color: checkLetterColor(wordID, letterID, wordCount, input, letter),
          }}
          key={letterID}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
