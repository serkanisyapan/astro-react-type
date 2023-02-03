import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import { getLocalStorage } from "../utils/getLocalStorage";
import { getRunsDate } from "../utils/getRunsDate";
import { calculateWPM } from "../utils/calculateWPM.js";
import "../styles/Timer.css";

export const Timer = ({ keyStrokes, wrongLetters, gameState, gameMode }) => {
  const [seconds, setSeconds] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [popConfetti, setPopConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({});
  const timerInterval = useRef(null);

  const { netWPM, rawWPM } = WPM;

  const newTimer = () => {
    clearInterval(timerInterval.current);
    timerInterval.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const resetTimer = () => {
    setSeconds(0);
    setPopConfetti(false);
    clearInterval(timerInterval.current);
  };

  const newWPM = () => {
    if (seconds === 0) {
      return calculateWPM(keyStrokes, 1, wrongLetters);
    } else {
      return calculateWPM(keyStrokes, seconds, wrongLetters);
    }
  };

  const getHighestWPM = (newRunWPM) => {
    const localstorage = JSON.parse(localStorage.getItem("lastRuns")) || [];
    const sortAllWPM = localstorage
      .map((runs) => runs.netWPM)
      .sort((a, b) => b - a);
    if (localstorage.length === 0 || newRunWPM > sortAllWPM[0]) {
      setPopConfetti(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    return () => window.removeEventListener("resize");
  }, []);

  useEffect(() => {
    const getWPM = newWPM();
    setWPM(getWPM);
  }, [keyStrokes]);

  useEffect(() => {
    if (gameState === "typing") {
      newTimer();
    }
    if (gameState === "runIsOver") {
      if (netWPM > 0) {
        const runDate = getRunsDate();
        getHighestWPM(netWPM);
        getLocalStorage("lastRuns", {
          keyStrokes,
          wrongLetters,
          seconds,
          netWPM,
          rawWPM,
          gameMode,
          runDate,
        });
      }
      clearInterval(timerInterval.current);
    }
    if (gameState === "timerReset") {
      resetTimer();
    }
  }, [gameState]);

  let timerContent;
  if (gameState === "runIsOver" && netWPM < 0) {
    timerContent = <span className="wpm">0 WPM</span>;
  } else if (gameState === "runIsOver" && netWPM > 0) {
    timerContent = <span className="wpm">{netWPM} WPM</span>;
  }

  return (
    <>
      {popConfetti ? (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
        />
      ) : null}
      <span className="timer">
        <span className="seconds">{seconds}s</span>
        {timerContent}
      </span>
    </>
  );
};
