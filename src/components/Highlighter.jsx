export const Highlighter = ({ highlighter, wordCount, gameMode }) => {
  return (
    <div
      style={{
        top: highlighter.top + "px",
        left: highlighter.left + "px",
        height: highlighter.height + "px",
        width: highlighter.width + "px",
        position: "absolute",
        backgroundColor: wordCount === gameMode ? "" : "rgb(255, 228, 23, 0.5)",
        borderRadius: "3px",
        transition: "all 0.2s",
      }}
    ></div>
  );
};
