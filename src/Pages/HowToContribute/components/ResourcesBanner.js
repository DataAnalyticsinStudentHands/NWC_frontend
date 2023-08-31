import React from "react";
import PropTypes from 'prop-types';
import researcher_button from "../res/researcher_button.png";
import archivists_button from "../res/archivist_button.png";
import educators_button from "../res/educators_button.png";
import nwc_button from "../res/nwc_participants_button.png";
import students_button from "../res/students_button.png";
import ReactMarkdown from 'react-markdown';

const IconObj = {
	researchers: researcher_button,
	archivists: archivists_button,
	educators: educators_button,
	students: students_button,
	'nwc participants': nwc_button,
};
export const ResourcesBanner = ({ resource, text, icon }) => {
	let iconUrl = ''
	icon.data 
		? (iconUrl = `${process.env.REACT_APP_API_URL}${icon.data.attributes.url}`) 
		: (iconUrl = IconObj[resource]);

	return (
		<div className="resources-banner">
			<img src={iconUrl} alt={`${resource} Banner Icon`} />
			<div>
				<h1>RESOURCES FOR {resource}</h1>
				<div>
					<div />
					<div />
					<div />
				</div>
				<ReactMarkdown>{text}</ReactMarkdown>
			</div>
		</div>
	);
};

ResourcesBanner.propTypes = {
    resource: PropTypes.oneOf(['researchers', 'archivists', 'educators','students','nwc participants']),
    text: PropTypes.string,
	icon: PropTypes.object
};
ResourcesBanner.defaultProps = {
	resource: 'researchers',
	text: 'Summary Text',
	icon:{
		data:null
	}
}
