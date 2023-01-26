import newRunLogo from "../../public/assets/new-run-button.svg";
import "../styles/NewRunButton.css";

export const NewRunButton = ({ newRun }) => {
  return (
    <div className="button-container">
      <button onClick={newRun} className="refresh-button">
        <img src={newRunLogo} alt="new turn button" />
      </button>
      <span className="run-tooltip">CTRL+R</span>
    </div>
  );
};
