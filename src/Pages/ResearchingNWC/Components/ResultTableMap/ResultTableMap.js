import { useState, useEffect } from "react";
import Tabs from "../Tabs";
import { ResearchTable } from "../ResearchTable";
import { ResearchMap } from "../ResearchMap/ResearchMap";
import "./ResultTableMap.css";
import { CSVLink } from "react-csv";
import { Pagination } from "../Pagination";

export const ResultTableMap = (props) => {
  const { data, map_data, userInput } = props;
  const [downloadData, setDownloadData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const coinsPerPage = 10;
  const [sortKey, setSortKey] = useState("#");
  const [sortOrder, setSortOrder] = useState("asc");

  console.log(userInput)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * coinsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    setDownloadData(
      data.map((participant) => {
        Object.entries(participant).forEach(([key, value]) => {
          Array.isArray(value)
            ? (participant[key] = value.join("; "))
            : (participant[key] = value);
        });
        return participant;
      })
    );
  }, [data]);

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "asc") {
      if (a[sortKey] === null) return 1;
      if (b[sortKey] === null) return -1;
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      if (a[sortKey] === null) return -1;
      if (b[sortKey] === null) return 1;
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  const endOffset = itemOffset + coinsPerPage;
  const currentData = sortedData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / coinsPerPage);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="TableInfor">
        <div className="TableInfor-Left">
          {userInput.length === 0 ? (
            <span className="TableInfor-Left-Text">
              {data.length} Results found
            </span>
          ) : (
            <span className="TableInfor-Left-Text">
              {data.length} Results found for: {userInput.join(" + ")}
            </span>
          )}
        </div>
        <div className="TableInfor-Right">
          <CSVLink
            data={downloadData}
            headers={Object.keys(data[0]).map((key) => {
              return { label: key, key: key };
            })}
            filename={`Participants_Results_${userInput.join("_")}.csv`}
            className="TableInfor-Right-Button"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
      <Tabs>
        <div label="Chart View" className="TableContiner">
          <ResearchTable
            data={currentData}
            sortKey={sortKey}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
          {data.length > 10 && (
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
        <div label="Map View">
          <ResearchMap map_data={map_data} />
        </div>
      </Tabs>
    </>
  );
};
