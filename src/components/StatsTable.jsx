import { useState, useEffect, useMemo } from "react";
import { StatsChart } from "./StatsChart";
import { Table } from "./Table";

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

  const reverseLastRuns = lastRuns.slice().reverse();

  return (
    <>
      {lastRuns.length > 0 ? (
        <>
          <StatsChart data={lastRuns} />
          <Table columns={columns} data={reverseLastRuns} />
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
