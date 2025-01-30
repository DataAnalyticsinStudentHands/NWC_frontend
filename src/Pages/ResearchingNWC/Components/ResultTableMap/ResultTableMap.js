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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * coinsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // Step 1: Collect all unique races, plank values, and roles from the dataset
    const allRaces = new Set();
    const allPlanks = new Set();
    const allRoles = new Set();
  
    data.forEach((participant) => {
      // Collect races
      if (participant.Race) {
        const races = participant.Race.split(",").map((race) => race.trim());
        races.forEach((race) => allRaces.add(race));
      }
  
      // Collect plank values from "Planks For" and "Planks Against"
      if (participant["Planks For"]) {
        const planksFor = participant["Planks For"].split(",").map((plank) => plank.trim());
        planksFor.forEach((plank) => allPlanks.add(plank));
      }
      if (participant["Planks Against"]) {
        const planksAgainst = participant["Planks Against"].split(",").map((plank) => plank.trim());
        planksAgainst.forEach((plank) => allPlanks.add(plank));
      }
  
      // Collect roles
      if (participant.Role) {
        const roles = participant.Role.split(",").map((role) => role.trim());
        roles.forEach((role) => allRoles.add(role));
      }
    });
  
    // Step 2: Transform the data
    const transformedData = data.map((participant) => {
      const newParticipant = { ...participant };
  
      // Handle the Race key
      if (newParticipant.Race) {
        const races = newParticipant.Race.split(",").map((race) => race.trim());
        allRaces.forEach((race) => {
          newParticipant[race] = races.includes(race) ? "yes" : "no";
        });
        delete newParticipant.Race; // Remove the original Race key
      }
  
      // Handle "Planks For" and "Planks Against" keys
      if (newParticipant["Planks For"]) {
        const planksFor = newParticipant["Planks For"].split(",").map((plank) => plank.trim());
        planksFor.forEach((plank) => {
          newParticipant[plank] = "for";
        });
        delete newParticipant["Planks For"]; // Remove the original key
      }
      if (newParticipant["Planks Against"]) {
        const planksAgainst = newParticipant["Planks Against"].split(",").map((plank) => plank.trim());
        planksAgainst.forEach((plank) => {
          newParticipant[plank] = "against";
        });
        delete newParticipant["Planks Against"]; // Remove the original key
      }
  
      // Handle the Role key
      if (newParticipant.Role) {
        const roles = newParticipant.Role.split(",").map((role) => role.trim());
        allRoles.forEach((role) => {
          newParticipant[role] = roles.includes(role) ? "yes" : "no";
        });
        delete newParticipant.Role; // Remove the original Role key
      }
  
      // Handle other keys (e.g., join arrays into strings)
      Object.entries(newParticipant).forEach(([key, value]) => {
        if (Array.isArray(value) && key !== "Race" && key !== "Planks For" && key !== "Planks Against" && key !== "Role") {
          newParticipant[key] = value.join("; ");
        }
      });
  
      return newParticipant;
    });
  
    // Step 3: Update the downloadData state
    setDownloadData(transformedData);
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
            headers={Object.keys(downloadData[0] || {}).map((key) => {
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