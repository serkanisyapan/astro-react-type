import { useState, useRef, useEffect } from "react";
import { getLocalStorage } from "../utils/getLocalStorage";
import "../styles/Timer.css";

export const Timer = ({
  calculateWPM,
  keyStrokes,
  wrongLetters,
  gameState,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [WPM, setWPM] = useState(0);
  const timerInterval = useRef(null);
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
  }, [seconds]);

  useEffect(() => {
    if (isGameStarted) {
      newTimer();
    }
    if (isGameOver) {
      if (WPM > 0) {
        getLocalStorage("lastRuns", { keyStrokes, wrongLetters, seconds, WPM });
      }
      clearInterval(timerInterval.current);
    }
    if (timerReset) {
      resetTimer();
    }
  }, [isGameOver, timerReset, isGameStarted]);

  return (
    <p className="timer">
      {WPM < 0 ? <span>0 WPM</span> : <span>{WPM} WPM</span>}
      <span className="seconds">{seconds}s</span>
    </p>
  );
};
