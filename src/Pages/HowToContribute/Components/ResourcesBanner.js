import React from "react";
import PropTypes from 'prop-types';
import researcher_button from "../res/researcher_button.png";
import archivists_button from "../res/archivist_button.png";
import educators_button from "../res/educators_button.png";
import nwc_button from "../res/nwc_participants_button.png";
import students_button from "../res/students_button.png";
const IconObj = {
	researchers: researcher_button,
	archivists: archivists_button,
	educators: educators_button,
	students: students_button,
	'nwc participants': nwc_button,
};
export const ResourcesBanner = ({ resource, text }) => {
	return (
		<div className="resources-banner">
			<img src={IconObj[resource]} alt={`${resource} Banner Icon`} />
			<div>
				<h1>RESOURCES FOR {resource}</h1>
				<div>
					<div />
					<div />
					<div />
				</div>
				<p>{text}</p>
			</div>
		</div>
	);
};

ResourcesBanner.propTypes = {
    resource: PropTypes.oneOf(['researchers', 'archivists', 'educators','students','nwc']).isRequired,
    text: PropTypes.string
};
