import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import htcBannerPic from "./res/htcBannerPic.png";
import archivists_button from "./res/archivists_button.png";
import researcher_button from "./res/researcher_button.png";
import educators_button from "./res/educators_button.png";
import students_button from "./res/students_button.png";
import nwc_button from "./res/nwc_participants_button.png";
import how_to_contribute_button from "../../assets/res/button-how-to-contribute.png";
// import BannerCard from "../../Components/BannerCard/BannerCard";
// import CaptionedImg from "../../Components/CaptionedImg/CaptionedImg";

import { Banner } from "../../Components/Banner";

function HowToContribute() {
	const [banner_card, setBannerText] = useState("");
	const [imgCredit, setBannerImageCredit] = useState("");

	const [involvedData, setInvolvedData] = useState({});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/content-how-to-contribute`)
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImageCredit,
							// BannerImageCredit_more,
							ResearchersText,
							NwcParticipantsText,
							EducatorsText,
							StudentsText,
							ArchivistsText,
						},
					},
				} = data;
				setBannerText(BannerText);
				setBannerImageCredit(BannerImageCredit);


                setInvolvedData({
                    researchers: {
                        title: "researchers",
                        text: ResearchersText,
                        img: researcher_button
                    },
                    archivists: {
                        title: "archivists",
                        text: ArchivistsText,
                        img: archivists_button
                    },
                    nwc: {
                        title: "nwc participants",
                        text: NwcParticipantsText,
                        img: nwc_button
                    },
                    educators: {
                        title: "educators",
                        text: EducatorsText,
                        img: educators_button
                    },
                    students: {
                        title: "students",
                        text: StudentsText,
                        img: students_button
                    }

                });
			});
	}, []);

	return (
		<div className="howToContribute">
			<Banner
				imgLeft={how_to_contribute_button}
				text={banner_card}
				imgRight={htcBannerPic}
				imgCredit={imgCredit}
			/>
            <div className="howToContribute_Involved_container">

                <h1>HOW TO GET INVOLVED</h1>

                {Object.keys(involvedData).map((key) => {
                    const { title, text, img } = involvedData[key];
                    return (
                        <div className="row">
                            <div className="item-left">
                                <img src={img} alt="_"></img>
                            </div>
                            <div className="itemr-ight">
                                <Link to={key}>{title}</Link>
                                <p>{text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="howToContribute_Submission_container">
                <h1>SUBMISSIONS</h1>
                <p>{banner_card}</p>
                <div>
                    <Link to="/forms/contactus">
                        Contact us
                    </Link>
                    <Link to="/forms/moreideas">
                        Have more ideas? Tell us here
                    </Link>
                </div>
            </div>
		</div>
	);
}
export default HowToContribute;
