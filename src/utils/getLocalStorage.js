export const getLocalStorage = (storageName, value) => {
  localStorage.setItem(
    `${storageName}`,
    JSON.stringify(
      JSON.parse(localStorage.getItem(`${storageName}`) || "[]").concat([value])
    )
  );
};
