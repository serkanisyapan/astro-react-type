import { useRef, useEffect } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import "../styles/Word.css";

export const Word = ({ word, wordID, wordCount, wordHighlighter }) => {
  const scrollToWord = useRef(null);

  useEffect(() => {
    const backgroundColor = scrollToWord.current.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollToWord.current.scrollIntoView({
        behavior: "smooth",
      });
      const {offsetTop, offsetLeft, offsetWidth} = scrollToWord.current
      wordHighlighter(offsetTop, offsetLeft, offsetWidth, 49);
    }
  }, [wordCount, word]);

  return (
    <span
      ref={scrollToWord}
      className="words"
      style={{
        color: checkWordColor(word),
        backgroundColor: wordID === wordCount ? "rgba(0, 0, 0, 0.01)" : "",
      }}
    >
      {word.text}
    </span>
  );
};
