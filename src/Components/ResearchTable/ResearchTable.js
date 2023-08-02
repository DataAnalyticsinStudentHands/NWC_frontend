import React from "react";
import { isArray, startsWith } from "lodash";
import "./ResearchTable.css";
export const ResearchTable = (props) => {
	const { data } = props;

	return (
		<>
				<table className="result-table">
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
		</>
	);
};
