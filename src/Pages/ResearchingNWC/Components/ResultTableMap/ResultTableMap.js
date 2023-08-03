import React, {useState , useEffect} from "react";
import Tabs from "../Tabs";
import { ResearchTable } from "../../../../Components/ResearchTable";
import { ResearchMap } from '../../../../Components/ResearchMap/ResearchMap';
import "./ResultTableMap.css";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import LeftButtonIcon from '../../res/Left Button.svg';
import RightButtonIcon from '../../res/Right Button.svg';
export const ResultTableMap = (props) => {
	const { data, map_data } = props;
    const [downloadData, setDownloadData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const coinsPerPage = 10;
    const endOffset = itemOffset + coinsPerPage;
    const currentData =data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / coinsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * coinsPerPage) % data.length;
      setItemOffset(newOffset);
    };
    useEffect(() => {
        setDownloadData(
            data.map((participant) => {
                Object.entries(participant).forEach(([key, value]) => {
                    Array.isArray(value) ? participant[key] = value.join('; ') : participant[key] = value;
                });
                return participant;
            })
        )
    }, [data]);

	return (
        <>
        <div className="TableInfor">
            <div className="TableInfor-Left">
                <span className="TableInfor-Left-Text">Showing {itemOffset + 1} to {endOffset} of {data.length} Participants</span>
            </div>
            <div className="TableInfor-Right">
                <CSVLink
                    data={downloadData}
                    headers={Object.keys(data[0]).map((key) => {
                        return { label: key, key: key };
                    })}
                    filename={`Participants_Results_${Date.now()}.csv`}
                    className="TableInfor-Right-Button" 
                >
                    Download CSV
                </CSVLink>
            </div>
        </div>
		<Tabs>
			<div label="Chart View" className="TableContiner">
                <ResearchTable data={currentData} />
                {
                    data.length > 10 && (
                        <ReactPaginate
                            containerClassName="Research-Pagination"
                            nextLabel={<img src={RightButtonIcon} alt="RightButtonIcon" />}
                            previousLabel={<img src={LeftButtonIcon} alt="LeftButtonIcon" />}
                            previousLinkClassName=""
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
			<div label="Map View">
                <ResearchMap map_data={map_data} />
            </div>
		</Tabs>
        </>
	);
};
