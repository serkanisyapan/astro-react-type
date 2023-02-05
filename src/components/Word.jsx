import { useEffect, useRef } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import { checkLetterColor } from "../utils/checkLetterColor";
import "../styles/Word.css";

export const Word = ({ word, wordID, wordCount, wordHighlighter, input }) => {
  const getWordChars = word.text.split("");
  const scrollToWord = useRef(null);

  useEffect(() => {
    const backgroundColor =
      scrollToWord.current.children[input.length]?.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollToWord.current.scrollIntoView({
        behavior: "smooth",
      });
      const { offsetTop, offsetLeft, offsetWidth } =
        scrollToWord.current.children[input.length];
      wordHighlighter(offsetTop, offsetLeft, offsetWidth, 29);
    }
  }, [input, word]);

  return (
    <span
      className="words"
      ref={scrollToWord}
      style={{
        color: checkWordColor(word),
        backgroundColor: wordCount === wordID ? "rgba(0, 0, 0, 0.01)" : "",
      }}
    >
      {getWordChars.map((char, charID) => (
        <span
          style={{
            color: checkLetterColor(wordID, charID, wordCount, input, char),
            backgroundColor:
              wordCount === wordID && charID === input.length
                ? "rgba(0, 0, 0, 0.01)"
                : "",
          }}
          key={charID}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
