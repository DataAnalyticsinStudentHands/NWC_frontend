import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import researcher_button from "../res/researcher_button.png";
import colorCorner from "../res/colorCorner.png"
import colorCornerResearcher from "../res/colorCornerResearcher.png"

import oralIcon from '../res/oralIcon.png'
import contributeIcon from '../res/contributeIcon.png'
import techIcon from '../res/techIcon.png'
import permissionIcon from '../res/permissionIcon.png'
import ideaIcon from '../res/ideaIcon.png'
import archivalIcon from '../res/archivalIcon.png'
import iconPapers from '../res/iconPapers.png'
import iconClass from '../res/iconClass.png'

export const Resources = ({ type, resourceText }) => {
	const { resource } = useParams();
	const [data, setData] = useState({});


	useEffect(() => {
		fetch(
			`${process.env.REACT_APP_API_URL}/api/content-toolkit?populate=*"`
		)
			.then((res) => res.json())
			.then((data) => {
				let obj = {};
				Object.entries(data.data.attributes).forEach(([key, value]) => {
					key.split("_")[2]?.toLowerCase() === resource &&
						(key.split("_")[3]
							? (obj[key.split("_")[3].toLowerCase()] = value)
							: (obj[key.split("_")[1].toLowerCase()] = value));
				});

				setData(obj);

				// const {
				//     data: {
				//         attributes: {
				//             ResearchersText,
				//             NwcParticipantsText,
				//             EducatorsText,
				//             StudentsText,
				//             ArchivistsText,
				//         },
				//     },
				// } = data;
			});
	}, [resource]);

    const num = 5;
	return (
		<div className="resources">
			<div className="header-container">
				<img src={researcher_button} alt="resource icon" />
				<div>
					<h1>RESOURCES FOR {resource}</h1>
					<div>
						<div />
						<div />
						<div />
					</div>
					<p>{data.text}</p>
				</div>
			</div>

			<div className='video-container'>
                <ReactPlayer
                    url={data.url}
                    controls={true}
                    width="100%"
                    height="100%"
                />
			</div>

            <div className="icons-container" style={{
                gap: num + 'em'
            }}>
            {
                Array(num).fill().map((_, i) => (
                    <div key={i} className="icon-container">
                        <img src={oralIcon} alt="oral history icon" />
                        <p>Oral History</p>
                    </div>
                ))
            }
            </div>

            <div className="idea-container">
                <img src={ideaIcon} alt="resource icon" />
                <h1>Have More Ideas? Tell Us Here</h1>
            </div>

		</div>
	);
};
