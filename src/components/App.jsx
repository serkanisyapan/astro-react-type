import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Word } from "./Word.jsx";
import { Timer } from "./Timer.jsx";
import { LastTurns } from "./LastTurns.jsx";
import { Highlighter } from "./Highlighter.jsx";
import { NewRunButton } from "./NewRunButton.jsx";
import { allWords } from "../data/words.js";
import { pickRandomWords } from "../utils/pickRandomWords.js";
import { calculateWPM } from "../utils/calculateWPM.js";
import "../styles/App.css";

export const App = () => {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [keyStrokes, setKeyStrokes] = useState(0);
  const [gameType, setGameType] = useState(30);
  const [wrongLetters, setWrongLetters] = useState(0);
  const [highlighter, setHighlighter] = useState({});
  const [gameState, setGameState] = useState({
    isGameOver: false,
    isGameStarted: false,
    timerReset: false,
  });
  const [showTable, setShowTable] = useState(false);
  const focusRef = useRef(null);
  const scrollRef = useRef(null);

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

    if (event.ctrlKey && event.key === "r") {
      event.preventDefault();
      newRun();
    }
  };

  // when typer starts typing timer starts
  const handleOnChange = (event) => {
    setUserInput(event.target.value);
    if (!gameState.isGameStarted) {
      setGameState({ ...gameState, isGameStarted: true, timerReset: false });
    }
  };

  // sets everything back to initial load
  const newRun = () => {
    setWordCount(0);
    setUserInput("");
    setGameState({ isGameStarted: false, isGameOver: false, timerReset: true });
    setKeyStrokes(0);
    setWrongLetters(0);
    setWords(pickRandomWords(allWords, gameType));
    focusRef.current.focus();
  };

  const handleGameType = (number) => {
    setWords(pickRandomWords(allWords, number));
    newRun();
  };

  const showLastRuns = () => {
    setShowTable(!showTable);
  };

  const highlighterPosition = (top, left, width, height, scrollY) => {
    setHighlighter({ top, left, width, height, scrollY });
  };

  // keeps track of how many word typed
  const typedWordCount = `${wordCount}/${words.length}`;

  // on page load creates new run
  useEffect(() => {
    setWords(pickRandomWords(allWords, gameType));
    focusRef.current.focus();
  }, []);

  // checks if game is over when user types a word
  useEffect(() => {
    if (wordCount === gameType) {
      setGameState({ ...gameState, isGameOver: true, isGameStarted: false });
    }
  }, [wordCount]);

  // creates a new run when user changes game type
  useEffect(() => {
    handleGameType(gameType);
  }, [gameType]);

  return (
    <>
      <div className="type-container">
        <div className="scores">
          <span className="word-count-board">{typedWordCount}</span>
          <span className="gametype">
            <span
              onClick={() => setGameType(30)}
              style={{ color: gameType === 30 ? "#fee7158a" : "" }}
            >
              30
            </span>
            |
            <span
              onClick={() => setGameType(50)}
              style={{ color: gameType === 50 ? "#fee7158a" : "" }}
            >
              50
            </span>
          </span>
          {showTable &&
            createPortal(
              <LastTurns showLastRuns={showLastRuns} />,
              document.body
            )}

          <p onClick={showLastRuns} className="lastrun-text">
            Show Last Runs
          </p>
        </div>
        <div ref={scrollRef} className="word-container">
          <Highlighter
            highlighter={highlighter}
            gameType={gameType}
            wordCount={wordCount}
          />
          {words.map((word, wordID) => (
            <Word
              key={wordID}
              word={word}
              wordID={wordID}
              wordCount={wordCount}
              wordHighlighter={highlighterPosition}
            />
          ))}
        </div>
        <div className="input-container">
          <input
            ref={focusRef}
            className="word-input"
            value={userInput}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            disabled={gameState.isGameOver ? true : false}
          />
          <Timer
            calculateWPM={calculateWPM}
            keyStrokes={keyStrokes}
            gameState={gameState}
            wrongLetters={wrongLetters}
          />
        </div>
        <NewRunButton newRun={newRun} />
      </div>
    </>
  );
};
