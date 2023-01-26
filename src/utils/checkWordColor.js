export const checkWordColor = (object) => {
  if (object.isCorrect === null) return "white";
  if (object.isCorrect) return "#38E54D";
  if (!object.isCorrect) return "#D2001A";
};
