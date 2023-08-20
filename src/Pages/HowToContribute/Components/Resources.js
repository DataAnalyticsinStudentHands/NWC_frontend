import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";

import oralIcon from "../res/oralIcon.png";
import contributeIcon from "../res/contributeIcon.png";
import techIcon from "../res/techIcon.png";
import permissionIcon from "../res/permissionIcon.png";
import ideaIcon from "../res/ideaIcon.png";
import archivalIcon from "../res/archivalIcon.png";
import iconPapers from "../res/iconPapers.png";
import iconClass from "../res/iconClass.png";
import qs from "qs";

import { ResourcesBanner } from "./ResourcesBanner";
import { Card } from "../../../Components/Card";
import { Stack } from "../../../Components/Stack";
const IconObj = {
    "oral": oralIcon,
    "biographies": contributeIcon,
    "information": archivalIcon,
    "papers": iconPapers,
    "classroom": iconClass,
    "guidelines": techIcon,
    "permissions": permissionIcon,
}

export const Resources = () => {
	const { resource } = useParams();
	// const [gap, setGap] = useState(3);
	const [data, setData] = useState({});

	useEffect(() => {
		const query = qs.stringify(
			{
				filters: {
					resource: {
                        $eq: resource
                    },
				},
				populate: ["files.file"],
			},
			{ encodeValuesOnly: true }
		);
		fetch(
			`${process.env.REACT_APP_API_URL}/api/content-resources?${query}`
		)
			.then((res) => res.json())
			.then((data) => {
				let dataObj = data.data[0].attributes;
				dataObj.files.forEach((file, i) => {
					file.title.toLowerCase().includes("oral") &&
						(dataObj.files[i].icon = IconObj["oral"]);
					file.title.toLowerCase().includes("biographies") &&
						(dataObj.files[i].icon = IconObj["biographies"]);
					file.title.toLowerCase().includes("information") &&
                        (dataObj.files[i].icon = IconObj["information"]);
                    file.title.toLowerCase().includes("papers") &&
                        (dataObj.files[i].icon = IconObj["papers"]);
                    file.title.toLowerCase().includes("classroom") &&
                        (dataObj.files[i].icon = IconObj["classroom"]);
                    file.title.toLowerCase().includes("guidelines") &&
                        (dataObj.files[i].icon = IconObj["guidelines"]);
                    file.title.toLowerCase().includes("permissions") &&
                        (dataObj.files[i].icon = IconObj["permissions"]);
                });
				setData(dataObj);
				// dataObj.files.length === 5 && setGap(5);
			});
	}, [resource]);

	return (
		<div className="resources">

            <ResourcesBanner resource={resource} text={data.resource_summary} />

			<div className="video-container">
				<ReactPlayer
					url={data.video_url}
					controls={true}
					width="100%"
					height="100%"
				/>
			</div>

            <Stack spacing={3} wrap={true}>
                {data.files?.map((file, i) => (
					<Card 
						key={i}
						link={`/pdfviewer/${file.file.data.attributes.hash}.pdf`}
						img={file.icon} 
						title={file.title}
						spacing={4}
						className="Resources-Card"
					/>
                ))}
            </Stack>
			<div className="idea-container">
                <Link to="/forms/moreideas">
				    <img src={ideaIcon} alt="resource icon" />
                </Link>
				<h1>Have More Ideas? Tell Us Here</h1>
			</div>
		</div>
	);
};
