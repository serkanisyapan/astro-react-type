import { useState, useEffect, useRef, useMemo } from "react";
import { NewRunButton } from "./NewRunButton.jsx";
import { allWords } from "../data/words.js";
import { gameModes } from "../data/gameModes.js";
import { pickRandomWords } from "../utils/pickRandomWords.js";
import "../styles/App.css";
import { WordContainer } from "./WordContainer.jsx";
import { InputContainer } from "./InputContainer.jsx";
import { useCheckWords } from "../hooks/useCheckWords.jsx";

export const ReactType = ({ randomWords }) => {
  const [words, setWords] = useState(randomWords);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [keyStrokes, setKeyStrokes] = useState(0);
  const [gameMode, setGameMode] = useState(30);
  const [wrongLetters, setWrongLetters] = useState(0);
  const [gameState, setGameState] = useState("");
  const focusRef = useRef(null);
  const { checkIsLettersCorrect, checkIsWordCorrect } = useCheckWords({
    setKeyStrokes,
    setWordCount,
    setWords,
    setUserInput,
    setWrongLetters,
  });

  const handleKeyDown = (event) => {
    const wordLength = words[wordCount].text.length;
    const inputLength = userInput.length;
    if (
      (event.keyCode === 32 || event.key === " " || event.code === "Space") &&
      userInput.trim().length > 0
    ) {
      event.preventDefault();
      checkIsWordCorrect(userInput, words, wordCount);
      checkIsLettersCorrect(userInput, words, wordCount);
    }

    if (event.key === "Backspace") {
      if (keyStrokes === 0) return;
      setKeyStrokes((prev) => prev - 1);
    } else {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        event.code === "Space"
      )
        if (inputLength > wordLength) return;
      setKeyStrokes((prev) => prev + 1);
    }
  };

  // when typer starts typing timer starts
  const handleOnChange = (event) => {
    setUserInput(event.target.value);
    if (!gameState || gameState === "timerReset") {
      setGameState("typing");
    }
  };

  // sets everything back to initial load
  const newRun = () => {
    setWordCount(0);
    setUserInput("");
    setGameState("timerReset");
    setKeyStrokes(0);
    setWrongLetters(0);
    setWords(pickRandomWords(allWords, gameMode));
    focusRef.current.disabled = false;
    focusRef.current.focus();
  };

  const handlegameMode = (number) => {
    setWords(pickRandomWords(allWords, number));
    newRun();
  };

  // keeps track of how many word typed
  const typedWordCount = `${wordCount}/${words.length}`;

  // on page load creates new run
  useEffect(() => {
    const getGameMode = JSON.parse(localStorage.getItem("gameMode"));
    if (getGameMode) setGameMode(getGameMode);
    focusRef.current.focus();
  }, []);

  // checks if game is over when user types a word
  useEffect(() => {
    if (wordCount === gameMode) {
      setGameState("runIsOver");
    }
  }, [wordCount]);

  // creates a new run when user changes game type
  useEffect(() => {
    handlegameMode(gameMode);
    JSON.stringify(localStorage.setItem("gameMode", gameMode));
  }, [gameMode]);

  return (
    <div className="type-container">
      <div className="scores">
        <span className="word-count-board">{typedWordCount}</span>
        <span className="gamemode">
          {gameModes.map((mode, modeID) => (
            <span
              key={modeID}
              onClick={() => setGameMode(mode.mode)}
              style={{
                color: gameMode === mode.mode ? "#fee7158a" : `${mode.color}`,
              }}
            >
              {mode.mode}
            </span>
          ))}
        </span>
      </div>
      <WordContainer
        gameMode={gameMode}
        wordCount={wordCount}
        words={words}
        userInput={userInput}
      />
      <InputContainer
        focusRef={focusRef}
        userInput={userInput}
        handleKeyDown={handleKeyDown}
        handleOnChange={handleOnChange}
        gameState={gameState}
        gameMode={gameMode}
        keyStrokes={keyStrokes}
        wrongLetters={wrongLetters}
      />
      <NewRunButton newRun={newRun} />
    </div>
  );
};
