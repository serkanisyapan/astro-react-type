export const checkLetterColor = (
  wordID,
  letterID,
  count,
  userInput,
  letter
) => {
  if (userInput[letterID] && wordID === count) {
    if (letter === userInput[letterID]) {
      return "#38e54d";
    } else {
      return "#d2001a";
    }
  }
};
