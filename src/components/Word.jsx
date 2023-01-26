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
      let top = scrollToWord.current.offsetTop;
      let left = scrollToWord.current.offsetLeft;
      let width = scrollToWord.current.offsetWidth;
      let height = scrollToWord.current.offsetHeight;
      wordHighlighter(top, left, width, height);
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
