import { useHighlighter } from "../hooks/useHighlighter"
import { Highlighter } from "./Highlighter"
import { Word } from "./Word"

export const WordContainer = ({ gameMode, wordCount, words, userInput }) => {
  const { highlighter, getHighlighterPosition } = useHighlighter()
  return (
      <div className="word-container">
        <Highlighter
          gameMode={gameMode}
          wordCount={wordCount}
          highlighter={highlighter}
        />
        {words.map((word, wordID) => (
          <Word
            key={wordID}
            word={word}
            wordID={wordID}
            wordCount={wordCount}
            userInput={userInput}
            getHighlighterPosition={getHighlighterPosition}
          />
        ))}
      </div>
  )
}