import React, { useCallback } from "react";
import { utils, writeFileXLSX } from "xlsx";
import "./DownloadButton.css";
export default function DownloadCSVButton(props) {
	const { tbl, fileName, sheetName } = props;
	const exportFile = useCallback(() => {
		const elt = tbl.current.getElementsByTagName("TABLE")[0];
		const wb = utils.table_to_book(elt, {
			sheet: sheetName ? sheetName : "sheet",
		});
		// writeFileXLSX(wb,`${fileName }.xlsx`);
		let name = fileName ? fileName : "NWC";
		writeFileXLSX(wb, `${name}.xlsx`);
	}, [tbl, fileName, sheetName]);

	return (
		<div>
			<button className="downloadButton" onClick={exportFile}>
				Download
			</button>
		</div>
	);
}
