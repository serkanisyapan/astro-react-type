export const calcAverageWPM = (array) => {
  let totalWPM = 0;
  array.forEach((item) => (totalWPM += item.netWPM));
  return Math.round(totalWPM / array.length);
};
