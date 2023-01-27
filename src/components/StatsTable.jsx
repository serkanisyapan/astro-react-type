import { useState, useEffect, useMemo } from "react";
import { Table } from "./Table";

export const StatsTable = () => {
  const [lastRuns, setLastRuns] = useState();
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
          Header: "run date",
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
  }, []);

  return (
    <>
      {lastRuns ? (
        <Table columns={columns} data={lastRuns} />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
