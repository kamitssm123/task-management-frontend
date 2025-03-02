import React, { useCallback } from "react";

import "./Table.style.css";
import { Cell, Row } from "./types";

interface TableProps {
  header: Row;
  data: Row[];
  coloredRows?: boolean;
  idColumnIndex?: number;
}

const Table: React.FC<TableProps> = ({ header, data, coloredRows = true, idColumnIndex = 0 }) => {
  const renderCell = useCallback((cell: Cell, id: string) => {
    if (typeof cell === "string") {
      return cell;
    }
    if (typeof cell === "function") {
      return cell(id);
    }

    return null;
  }, []);

  if (!header.length || !data.length || !data[0].length) {
    return null;
  }

  return (
    <table className="table-container">
      <thead>
        <tr className="table-header-row">
          {header.map((headerCell, index) => (
            <th key={`headerCell_${index}`} className="table-header-cell">
              {renderCell(headerCell, index.toString())}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={`row_${index}`} className={coloredRows ? "table-data-row" : ""}>
            {item.map((cell, cellIndex) => (
              <td key={`cell_${cellIndex}`} className="table-data-cell">
                {renderCell(cell, item[idColumnIndex] as string)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
