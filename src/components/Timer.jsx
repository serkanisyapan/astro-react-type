import { useState, useRef, useEffect } from "react";
import { getLocalStorage } from "../utils/getLocalStorage";
import { getRunsDate } from "../utils/getRunsDate";
import "../styles/Timer.css";

export const Timer = ({
  calculateWPM,
  keyStrokes,
  wrongLetters,
  gameState,
  gameMode,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [WPM, setWPM] = useState(0);
  const timerInterval = useRef(null);

  const { netWPM, rawWPM } = WPM;
  const { isGameOver, isGameStarted, timerReset } = gameState;

  const newTimer = () => {
    clearInterval(timerInterval.current);
    timerInterval.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const resetTimer = () => {
    setSeconds(0);
    clearInterval(timerInterval.current);
  };

  const newWPM = () => {
    if (seconds === 0) {
      return calculateWPM(keyStrokes, 1, wrongLetters);
    } else {
      return calculateWPM(keyStrokes, seconds, wrongLetters);
    }
  };

  useEffect(() => {
    const getWPM = newWPM();
    setWPM(getWPM);
  }, [keyStrokes]);

  useEffect(() => {
    if (isGameStarted) {
      newTimer();
    }
    if (isGameOver) {
      if (netWPM > 0) {
        const getRunDate = getRunsDate();
        getLocalStorage("lastRuns", {
          keyStrokes,
          wrongLetters,
          seconds,
          netWPM,
          rawWPM,
          gameMode,
          getRunDate,
        });
      }
      clearInterval(timerInterval.current);
    }
    if (timerReset) {
      resetTimer();
    }
  }, [isGameOver, timerReset, isGameStarted]);

  return (
    <p className="timer">
      <span className="seconds">{seconds}s</span>
      {isGameOver ? (
        netWPM < 0 ? (
          <span className="wpm">0 WPM</span>
        ) : (
          <span className="wpm">{netWPM} WPM</span>
        )
      ) : null}
    </p>
  );
};
