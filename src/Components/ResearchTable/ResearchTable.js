import React from "react";
import { isArray, startsWith } from "lodash";
import "./ResearchTable.css";

export const ResearchTable = ({ data, sortKey, sortOrder, handleSort }) => {  
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

	return (
		<div className="result-table">
			<table>
				<thead>
					<tr>
						{Object.keys(sortedData[0]).map((val) => {
											return (
												<th key={val} onClick={() => handleSort(val)}>
												{val}
												</th>
											);
						})}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((val, index) => {
						return (
							<tr key={index}>
								{Object.values(val).map((e, index) => {
									return (
										<td key={index}>
											{isArray(e)
												? e
														.filter(
															(item) =>
																!startsWith(
																	item,
																	"Nominated"
																) &&
																!startsWith(
																	item,
																	"Votes"
																)
														)
														.join("; ")
												: e}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};