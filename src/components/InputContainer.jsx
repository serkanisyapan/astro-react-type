import { Timer } from "./Timer"

export const InputContainer = ({focusRef, userInput, wrongLetters, handleKeyDown, handleOnChange, gameMode, gameState, keyStrokes }) => {
  return (
      <div className="input-container">
        <input
          ref={focusRef}
          className="word-input"
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          disabled={gameState === "runIsOver" ? true : false}
        />
        <Timer
          gameMode={gameMode}
          keyStrokes={keyStrokes}
          gameState={gameState}
          wrongLetters={wrongLetters}
        />
      </div>
  )
}