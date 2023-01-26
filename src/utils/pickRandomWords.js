export const pickRandomWords = (array, number) => {
  let randomWords = [];
  for (let i = 0; i < number; i++) {
    let pickWord = array[Math.floor(Math.random() * array.length)];
    randomWords.push(pickWord);
  }
  return randomWords;
};
