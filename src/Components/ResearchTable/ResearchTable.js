import React, { useState } from "react";
import { isArray, startsWith } from "lodash";
import ReactPaginate from "react-paginate";
import "./ResearchTable.css";

export const ResearchTable = (props) => {
	const { data } = props;
	const [sortKey, setSortKey] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");
	const [itemOffset, setItemOffset] = useState(0);
	const coinsPerPage = 10;
	const endOffset = (itemOffset + coinsPerPage) > data.length ? data.length : itemOffset + coinsPerPage;

	const handleSort = (key) => {
		if (sortKey === key) {
		  // Reverse the sort order if the same column is clicked again
		  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
		  // Sort in ascending order by default for a new column
		  setSortKey(key);
		  setSortOrder("asc");
		}
	  };
	  
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

	const pageCount = Math.ceil(data.length / coinsPerPage);
	const currentData = sortedData.slice(
		itemOffset,
		itemOffset + coinsPerPage
	);
	
	const handlePageClick = (event) => {
		const newOffset = event.selected * coinsPerPage;
		setItemOffset(newOffset);
	};

	return (
		<div className="result-table">
			<table>
				<thead>
					<tr>
						{Object.keys(data[0]).map((val) => {
							return <th key={val}>{val}</th>;
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