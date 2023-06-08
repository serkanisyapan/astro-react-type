export const useCheckWords = ({ setWords, setWordCount, setUserInput, setWrongLetters, setKeyStrokes }) => {

  // check if typed word by user is correct or not
  // when user presses space word becomes green or red
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

  // check if type letter by user is correct or not
  // for every key stroke letter becomes green or red
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
  
  return { checkIsLettersCorrect, checkIsWordCorrect }
}
