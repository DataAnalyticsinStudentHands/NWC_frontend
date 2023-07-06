import React, { useCallback } from "react";
import { utils, writeFile } from "xlsx";
import Tabs from "../Tabs";

import { ResearchTable } from "../../../../Components/ResearchTable";
import { ResearchMap } from "../../../../Components/ResearchMap/ResearchMap";
import "./ResultTableMap.css";

export const ResultTableMap = (props) => {
    const { data, map_data } = props;

    /* get state data and export to XLSX */
    const exportFile = useCallback(() => {
      const exportData = data.map((participant) => {
        Object.entries(participant).forEach(([key, value]) => {
          Array.isArray(value)
            ? (participant[key] = value.join("; "))
            : (participant[key] = value);
        });
        return participant;
      });
      /* generate worksheet from state */
      const ws = utils.json_to_sheet(exportData);
      /* create workbook and append worksheet */
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Table Result");
      /* export to XLSX */
      writeFile(wb, "Participants.xlsx");
    }, [data]);

    return (
      <>
        <div className="TableInfor">
          <div className="TableInfor-Left">
            <span className="TableInfor-Left-Text">
              {data.length} Participants Found
            </span>
          </div>
          <div className="TableInfor-Right">
            <button className="TableInfor-Right-Button" onClick={exportFile}>
              Download
            </button>
          </div>
        </div>
        <Tabs>
          <div label="Chart" className="TableContiner">
            <ResearchTable data={data} />
          </div>
          <div label="Map">
            <ResearchMap map_data={map_data} />
          </div>
        </Tabs>
      </>
    );
};