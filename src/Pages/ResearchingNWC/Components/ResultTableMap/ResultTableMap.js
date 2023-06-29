import React, {useState, useCallback, useEffect} from "react";
import  {utils, writeFile } from "xlsx";
import Tabs from "../Tabs";

import { ResearchTable } from "../../../../Components/ResearchTable";
import { ResearchMap } from '../../../../Components/ResearchMap/ResearchMap';
import "./ResultTableMap.css";
import ReactPaginate from "react-paginate";
import { isArray } from "lodash";

export const ResultTableMap = (props) => {
	const { data, map_data } = props;
    const [itemOffset, setItemOffset] = useState(0);
    const coinsPerPage = 10;
    const endOffset = itemOffset + coinsPerPage;
    const [sortProperty, setSortProperty] = useState(null); // Track the sorting property
    const [sortedData, setSortedData] = useState([...data]); // Use a separate state variable for the sorted data
    //sort function
    const sortData = useCallback((property) => {
      const sortedArray = [...data]
        sortedArray.sort((a, b) => {
          if (property === 'firstName') {
            const firstNameA = a.Name.split(", ")[1];
            const firstNameB = b.Name.split(", ")[1];
      
            if (firstNameA < firstNameB) {
              return -1;
            }
            if (firstNameA > firstNameB) {
              return 1;
            }
          } else if (property === 'lastName') {
            const lastNameA = a.Name.split(", ")[0];
            const lastNameB = b.Name.split(", ")[0];
      
            if (lastNameA < lastNameB) {
              return -1;
            }
            if (lastNameA > lastNameB) {
              return 1;
            }
          } else {
            if (a[property] < b[property]) {
              return -1;
            }
            if (a[property] > b[property]) {
              return 1;
            }
          }
          return 0;
        });
        setSortedData(sortedArray)
        setSortProperty(property);
      }, [data]);

    // Sort the data when the sort property changes
    useEffect(() => {
        if (sortProperty) {
        sortData(sortProperty);
        }
    }, [sortData, sortProperty]);

    const currentData = sortedData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / coinsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * coinsPerPage) % data.length;
      setItemOffset(newOffset);
    };

    /* get state data and export to XLSX */
    const exportFile = useCallback(() => {
        const exportData = data.map((participant) => {
            Object.entries(participant).forEach(([key, value]) => {
                isArray(value) ? (participant[key] = value.join('; ')): (participant[key] = value);
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

    const resetSort = () => {
        setSortProperty(null);
        setSortedData([...data])
        // Reset the data back to its original order
      };

	return (
        <>
        <div className="TableInfor">
            <div className="TableInfor-Left">
                <span className="TableInfor-Left-Text">Showing {itemOffset + 1} to {endOffset} of {data.length} Participants</span>
            </div>
            <div className="TableInfor-Right">
            <p > Sort By: </p>
              <button className={`TableInfor-Sort-Button ${sortProperty === 'firstName' ? 'active' : ''}`}  onClick={() => sortData('firstName')}>First Name</button>
              <button className={`TableInfor-Sort-Button ${sortProperty === 'lastName' ? 'active' : ''}`}  onClick={() => sortData('lastName')}>Last Name</button>
              <button className={`TableInfor-Sort-Button ${sortProperty === 'Race' ? 'active' : ''}`} onClick={() => sortData('Race')}>Race</button>
              <button className={`TableInfor-Sort-Button ${sortProperty === 'Residence in 1977' ? 'active' : ''}`}onClick={() => sortData('Residence in 1977')}>State</button>
              <button className={`TableInfor-Sort-Button ${sortProperty === 'Role at NWC' ? 'active' : ''}`} onClick={() => sortData('Role at NWC')}>Role</button>
              <button className="TableInfor-Reset-Button" onClick={resetSort}>Reset Sort</button>
              <button className="TableInfor-Right-Button" onClick={exportFile}>Download</button>
            </div>
        </div>
		<Tabs>
			<div label="Chart" className="TableContiner">
                <ResearchTable data={currentData} />
                {
                    data.length > 10 && (
                        <ReactPaginate
                            containerClassName="Research-Pagination"
                            nextLabel=""
                            previousLabel=""
                            previousLinkClassName={""}
                            nextLinkClassName={""}
                            disabledClassName={"disabled"}
                            activeClassName={"active"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            renderOnZeroPageCount={null}
                        />
                    )
                }
			</div>
			<div label="Map">
                <ResearchMap map_data={map_data} />
            </div>
		</Tabs>
        </>
	);
};
