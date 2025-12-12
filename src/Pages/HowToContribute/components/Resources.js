import { useEffect, useState } from "react";
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

import colorCorner from "../res/colorCorner.png";

import { ResourcesBanner } from "./ResourcesBanner";
import { Card } from "../../../Components/Card";
import { Stack } from "../../../Components/Stack";
const IconObj = {
	calling: oralIcon,
	biographies: contributeIcon,
	information: archivalIcon,
	papers: iconPapers,
	classroom: iconClass,
	guidelines: techIcon,
	inquiry: permissionIcon,
};

// Some of the forms are missing.
const formObj = {
	Corrections: "/forms/corrections",
	"Biographies and Orale Histories": "/",
	Archives: "/",
	"More Ideas": "/forms/moreideas",
	"Donate Papers": "/forms/donatepapers",
};

export const Resources = () => {
	const { resource } = useParams();
	const [data, setData] = useState({});

	useEffect(() => {
		const query = qs.stringify(
			{
				fields: ["banner_text", "video_url"],
				filters: {
					resource: {
						$eq: resource,
					},
				},
				populate: ["files.file", "resource_icon"],
			},
			{ encodeValuesOnly: true }
		);
		fetch(
			`${process.env.REACT_APP_API_URL}/api/content-how-to-contribute-resources?${query}`
		)
			.then((res) => res.json())
			.then((data) => {
				let dataObj = data.data[0].attributes;
				dataObj.files.forEach((file, i) => {
					if (!file.title.toLowerCase().includes("inquiry")) {
					file.link_to_form
						? (dataObj.files[i].link = formObj[file.link_to_form])
						: (dataObj.files[
								i
						].link = `/pdfviewer/${file.file.data.attributes.hash}.pdf`);
					}
					else {	
						file.link_to_form
						? (dataObj.files[i].link = formObj[file.link_to_form])
						: (dataObj.files[
								i
						].link = `/forms/contactus`);			
					}
					Object.entries(IconObj).forEach(([key, value]) => {
						file.title.toLowerCase().includes(key) &&
							(dataObj.files[i].icon = value);
					});
				});
				setData(dataObj);
			});
	}, [resource]);

	return (
		<div className="resources-container">
			<div className="tr-icon">
				<img src={colorCorner} alt="" />
			</div>
			<div className="bl-icon">
				<img src={colorCorner} alt="" />
			</div>
			<div className="resources">
				<ResourcesBanner
					resource={resource}
					text={data.banner_text}
					icon={data.resource_icon}
				/>

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
							link={file.link}
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
		</div>
	);
};
