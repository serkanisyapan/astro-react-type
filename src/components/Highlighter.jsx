export const Highlighter = ({ highlighter, wordCount, gameType }) => {
  return (
    <div
      style={{
        top: highlighter.top + "px",
        left: highlighter.left + "px",
        height: highlighter.height + "px",
        width: highlighter.width + "px",
        position: "absolute",
        backgroundColor:
          wordCount === gameType ? "" : "rgba(255, 228, 23, 0.404)",
        transition: "all 0.2s ease-in-out",
      }}
    ></div>
  );
};
