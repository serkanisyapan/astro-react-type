export const calculateWPM = (keyStrokes, seconds, wrongLetters) => {
  const rawWPM = Math.floor((keyStrokes / 5) * (60 / seconds));
  const uncorrectedErr = wrongLetters * (60 / seconds);
  const netWPM = Math.floor(rawWPM - uncorrectedErr);
  return { netWPM, rawWPM };
};
