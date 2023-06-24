import React, { useRef } from "react";
import DownloadCSVButton from "../downloadButton/DownloadButton";
import { isArray } from "lodash";
import './ResearchTable.css';
export const ResearchTable = (props) => {
	const { data } = props;
	const tbl = useRef(null);

	return (
		<>
			{data?.length > 0 ? (
				<DownloadCSVButton
					tbl={tbl}
					fileName="Particpant"
					sheetName="Search Result"
				/>
			) : null}

			<div ref={tbl} className="table-container">
                { data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((val) => {
                                    return (
                                        <th key={val}>
                                            {val}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.values(val).map((e, index) => {
                                            return (
                                                <td key={index}>
                                                    {isArray(e) && e.length > 1 ? (
                                                            <ul>
                                                                {e.map((e, index) => {
                                                                    return (
                                                                        <li key={e + index}>
                                                                            {e}
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        )
                                                     : e}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>Please select options for search</p>
                )}
			</div>
		</>
	);
};
