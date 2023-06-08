import { useState, useEffect, useRef } from "react";
import { NewRunButton } from "./NewRunButton.jsx";
import { allWords } from "../data/words.js";
import { gameModes } from "../data/gameModes.js";
import { pickRandomWords } from "../utils/pickRandomWords.js";
import "../styles/App.css";
import { WordContainer } from "./WordContainer.jsx";
import { InputContainer } from "./InputContainer.jsx";

export const ReactType = ({ randomWords }) => {
  const [words, setWords] = useState(randomWords);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [keyStrokes, setKeyStrokes] = useState(0);
  const [gameMode, setGameMode] = useState(30);
  const [wrongLetters, setWrongLetters] = useState(0);
  const [gameState, setGameState] = useState("");
  const focusRef = useRef(null);

  const checkIsWordCorrect = (input, array, count) => {
    const changedWords = array.map((item, itemID) => {
      if (count === itemID) {
        if (input === array[count].text) {
          return { ...item, isCorrect: true };
        } else {
          return { ...item, isCorrect: false };
        }
      }
      return item;
    });
    setWords(changedWords);
    setWordCount((prev) => prev + 1);
    setUserInput("");
  };

  const checkIsLettersCorrect = (input, array, count) => {
    let typedValue = input.slice("");
    let typedWord = array[count].text.slice("");
    for (let i = 0; i < typedWord.length; i++) {
      if (typedValue[i] && typedValue[i] !== typedWord[i]) {
        setWrongLetters((prev) => prev + 1);
      }
    }
    if (typedValue.length > typedWord.length) {
      let extraWords = typedValue.slice(typedWord.length).length;
      setKeyStrokes((prev) => prev - extraWords);
    }
  };

  const handleKeyDown = (event) => {
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