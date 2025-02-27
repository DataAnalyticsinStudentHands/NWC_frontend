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
    const allRaces = new Set();
    const allPlanks = new Set();
    const allRoles = new Set();
  
    data.forEach((participant) => {
      // Collect races
      if (participant.Race) {
        participant.Race.split(",").map((race) => race.trim()).forEach((race) => allRaces.add(race));
      }
  
      // Collect planks **without "N/A"**
      if (participant["Planks For"]) {
        participant["Planks For"].split(",").map((plank) => plank.trim()).forEach((plank) => {
          if (plank !== "N/A") allPlanks.add(plank);
        });
      }
      if (participant["Planks Against"]) {
        participant["Planks Against"].split(",").map((plank) => plank.trim()).forEach((plank) => {
          if (plank !== "N/A") allPlanks.add(plank);
        });
      }
  
      // Collect roles
      if (participant.Role) {
        participant.Role.split(",").map((role) => role.trim()).forEach((role) => allRoles.add(role));
      }
    });
  
    // **Ensure "N/A" is removed from sets just in case**
    allPlanks.delete("N/A");
    allRaces.delete("N/A");
    allRoles.delete("N/A");
  
    // Transform the data
    const transformedData = data.map((participant) => {
      const newParticipant = { ...participant };
  
      // Handle Race
      if (newParticipant.Race) {
        const races = newParticipant.Race.split(",").map((race) => race.trim());
        allRaces.forEach((race) => {
          newParticipant[race] = races.includes(race) ? "yes" : "no";
        });
        delete newParticipant.Race;
      }
  
      // Initialize all plank columns with "no"
      allPlanks.forEach((plank) => {
        newParticipant[plank] = "";
      });
  
      // Assign "for" to planks in "Planks For"
      if (newParticipant["Planks For"]) {
        newParticipant["Planks For"].split(",").map((plank) => plank.trim()).forEach((plank) => {
          if (plank !== "N/A") newParticipant[plank] = "for";
        });
      }
  
      // Assign "against" to planks in "Planks Against"
      if (newParticipant["Planks Against"]) {
        newParticipant["Planks Against"].split(",").map((plank) => plank.trim()).forEach((plank) => {
          if (plank !== "N/A") newParticipant[plank] = "against";
        });
      }
  
      // Remove the original "Planks For" and "Planks Against" keys
      delete newParticipant["Planks For"];
      delete newParticipant["Planks Against"];
  
      // Handle Role
      if (newParticipant.Role) {
        const roles = newParticipant.Role.split(",").map((role) => role.trim());
        allRoles.forEach((role) => {
          newParticipant[role] = roles.includes(role) ? "yes" : "no";
        });
        delete newParticipant.Role;
      }
  
      // Handle other keys (join arrays into strings)
      Object.entries(newParticipant).forEach(([key, value]) => {
        if (Array.isArray(value) && !["Race", "Planks For", "Planks Against", "Role"].includes(key)) {
          newParticipant[key] = value.join("; ");
        }
      });
  
      return newParticipant;
    });
  
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