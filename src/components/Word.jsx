import { useEffect, useRef } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import { checkLetterColor } from "../utils/checkLetterColor";
import "../styles/Word.css";

export const Word = ({ word, wordID, wordCount, wordHighlighter, input }) => {
  const getWordChars = word.text.split("");
  const scrollToWord = useRef(null);

  useEffect(() => {
    const inputLength = input.length;
    const backgroundColor =
      scrollToWord.current.children[inputLength]?.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollToWord.current.scrollIntoView({
        behavior: "smooth",
      });
      const { offsetTop, offsetLeft } =
        scrollToWord.current.children[inputLength];
      wordHighlighter(offsetTop, offsetLeft, 2, 29);
    }
  }, [input, word]);

  return (
    <div
      className="words"
      ref={scrollToWord}
      style={{
        color: checkWordColor(word),
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
      <span
        style={{
          display: "inline-flex",
          width: "2px",
          backgroundColor:
            wordCount === wordID &&
            input.length === scrollToWord.current?.children?.length - 1
              ? "rgba(0, 0, 0, 0.01)"
              : "",
        }}
      >
        {" "}
      </span>
    </div>
  );
};
