import { useState } from "react";

export const useHighlighter = () => {
  const [highlighter, setHighlighter] = useState({});

  const getHighlighterPosition = (top, left, width, height, scrollY) => {
    setHighlighter({ top, left, width, height, scrollY });
  };

  return { highlighter, getHighlighterPosition };
};
