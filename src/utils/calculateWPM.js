export const calculateWPM = (keyStrokes, seconds, wrongLetters) => {
  const WPM = Math.floor((keyStrokes / 5 - wrongLetters) * (60 / seconds));
  return WPM;
};
