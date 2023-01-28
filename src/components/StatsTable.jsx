import { useState, useEffect, useMemo } from "react";
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

  return (
    <>
      {lastRuns.length > 0 ? (
        <Table columns={columns} data={lastRuns} />
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
