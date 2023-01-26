import "../styles/LastTurns.css";

export const LastTurns = ({ showLastRuns }) => {
  const lastRurns = JSON.parse(localStorage.getItem("lastRuns"));

  const deleteLocalStorage = () => {
    localStorage.removeItem("lastRuns");
    showLastRuns();
  };

  let modalContent;

  if (!lastRurns) {
    modalContent = <p className="no-turn">No turns in the record</p>;
  } else {
    modalContent = (
      <div className="main-modal">
        <div className="table">
          <div className="table-columns">
            <span className="header">Net WPM</span>
            {lastRurns.slice(-5).map((turn, turnID) => (
              <span key={turnID}>{turn.WPM}</span>
            ))}
          </div>
          <div className="table-columns">
            <span className="header">Time</span>
            {lastRurns.slice(-5).map((turnTime, timeID) => (
              <span key={timeID}>00:{turnTime.seconds}</span>
            ))}
          </div>
          <div className="table-columns">
            <span className="header">Total Chars</span>
            {lastRurns.slice(-5).map((turnChar, charsID) => (
              <span key={charsID}>
                <span>{turnChar.keyStrokes}</span>/
                <span style={{ color: "#D2001a" }}>
                  {turnChar.wrongLetters}
                </span>
              </span>
            ))}
          </div>
        </div>
        <span onClick={deleteLocalStorage} className="delete-turns">
          Delete Runs
        </span>
      </div>
    );
  }

  return (
    <>
      <div onClick={showLastRuns} className="backdrop"></div>
      <div className="runs-modal">{modalContent}</div>
    </>
  );
};
