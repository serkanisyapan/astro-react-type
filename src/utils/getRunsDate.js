export const getRunsDate = () => {
  const newDate = new Date();
  let getDate = newDate.toLocaleDateString();
  let getTime = newDate.toLocaleTimeString().split(":").slice(0, 2).join(":");
  return getDate.concat(" ", getTime);
};
