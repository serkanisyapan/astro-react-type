import { useState, useEffect, useMemo } from "react";
import { StatsChart } from "./StatsChart";
import { Table } from "./Table";
import "../styles/StatsTable.css";

export const StatsTable = () => {
  const [lastRuns, setLastRuns] = useState([]);
  const [fetchedStorage, setFetchedStorage] = useState(false);
  const columns = useMemo(() => [
    {
      Header: "All Runs",
      columns: [
        {
          Header: "net wpm",
          accessor: "netWPM",
        },
        {
          Header: "raw wpm",
          accessor: "rawWPM",
        },
        {
          Header: "seconds",
          accessor: "seconds",
        },
        {
          Header: "total chars",
          accessor: "keyStrokes",
        },
        {
          Header: "wrong chars",
          accessor: "wrongLetters",
        },
        {
          Header: "run mode",
          accessor: "gameMode",
        },
        {
          Header: "date",
          accessor: "getRunDate",
        },
      ],
    },
  ]);

  useEffect(() => {
    const getLastRuns = JSON.parse(localStorage.getItem("lastRuns"));
    if (getLastRuns) {
      setLastRuns(getLastRuns);
    }
    setFetchedStorage(true);
  }, []);

  const get20Runs = lastRuns.slice(0, 20).reverse();

  return (
    <>
      {lastRuns.length > 0 ? (
        <>
          <StatsChart data={get20Runs} />
          <Table columns={columns} data={lastRuns} />
        </>
      ) : !fetchedStorage ? (
        <div style={{ margin: "auto", fontSize: "24px" }}>
          <img src="../../public/assets/LoadingSpinner.svg" />
        </div>
      ) : (
        <div style={{ margin: "auto", fontSize: "24px" }}>
          There no records. Do some{" "}
          <a style={{ color: "white" }} href="/">
            runs
          </a>{" "}
          to see your stats.
        </div>
      )}
    </>
  );
};
