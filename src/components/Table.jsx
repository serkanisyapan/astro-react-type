import { useState } from "react";
import { useTable, useSortBy } from "react-table";
import { UpArrow, DownArrow } from "./SortingIcons";
import "../styles/Table.css";

export const Table = ({ columns, data }) => {
  const [showRowCount, setShowRowCount] = useState(10);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  const showCount = rows.slice(0, showRowCount);
  const showButton = showRowCount < data.length;

  return (
    <div className="stats-table">
      <table {...getTableProps()} className="styled-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <DownArrow size="8" />
                      ) : (
                        <UpArrow size="8" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {showCount.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showButton && (
        <button
          className="load-more-btn"
          onClick={() => setShowRowCount((prev) => prev + 10)}
        >
          Load More...
        </button>
      )}
    </div>
  );
};
