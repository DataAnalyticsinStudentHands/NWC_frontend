import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './HowToContribute.css';
import htcBannerPic from "./res/htcBannerPic.png"
import archivists_button from "./res/archivists_button.png"
import researcher_button from "./res/researcher_button.png"
import educators_button from "./res/educators_button.png"
import students_button from "./res/students_button.png"
import nwc_button from "./res/nwc_participants_button.png"
import how_to_contribute_button from "../../assets/res/button-how-to-contribute.png"
import BannerCard from "../../Components/BannerCard/BannerCard";
import CaptionedImg from "../../Components/CaptionedImg/CaptionedImg";

function HowToContribute() {

    const [banner_card, setBannerText] = useState("");
    const [imgCredit, setBannerImageCredit] = useState("");
    const [imgCredit_more, setBannerImageCredit_more] = useState("");
    const [researchersText, setResearchersText] = useState("");
    const [nwcParticipantsText, setNwcParticipantsText] = useState("");
    const [educatorsText, setEducatorsText] = useState("");
    const [studentsText, setStudentsText] = useState("");
    const [archivistsText, setArchivistsText] = useState("");

    useEffect(() => {
        fetch([process.env.REACT_APP_API_URL, "api/content-how-to-contribute"].join('/'))
            .then(res => res.json())
            .then(data => {
                const{data:{attributes:{BannerText, BannerImageCredit, BannerImageCredit_more, ResearchersText, 
                    NwcParticipantsText, EducatorsText, StudentsText, ArchivistsText}}} = data
                setBannerText(
                    BannerText
                );
                setBannerImageCredit(
                    BannerImageCredit
                );
                setBannerImageCredit_more(
                    BannerImageCredit_more
                );
                setResearchersText(
                    ResearchersText
                );
                setNwcParticipantsText(
                    NwcParticipantsText
                );
                setEducatorsText(
                    EducatorsText
                );
                setStudentsText(
                    StudentsText
                );
                setArchivistsText(
                    ArchivistsText
                );
            })
    }, []);

    return (
        <div className="howToContribute">

            {/* BANNER */}
            <div className="contributeBanner">
                <img src={how_to_contribute_button} alt="How to Contribute" />
                <BannerCard text={banner_card} />
                <CaptionedImg
                    src={htcBannerPic}
                    caption={"Photo by " + imgCredit}
                    caption_more={imgCredit_more} />
            </div>

            {/* HOW TO GET INVOLVED BANNER */}
            <div className="howToContributeInvolved_banner">
                <div className="howToContributeInvolved_socialMedia">
                    <div className="howToContributeInvolved">
                        <h1>HOW TO GET INVOLVED</h1>
                    </div>
                </div>
            </div>

            {/* HOW TO GET INVOLVED LIST */}
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherBtn">
                    <img src={researcher_button} alt="_"></img>
                </div>
                <div className="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                        <Link to="researchers">RESEARCHERS</Link>
                        <p>{researchersText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={archivists_button} alt="_"></img>
                </div>
                <div className="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="archivists">ARCHIVISTS</Link>
                        <p>{archivistsText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={nwc_button} alt="_"></img>
                </div>
                <div className="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="nwc">NWC PARTICIPANTS</Link>
                        <p>{nwcParticipantsText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={educators_button} alt="_"></img>
                </div>
                <div className="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="educators">EDUCATORS</Link>
                        <p>{educatorsText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={students_button} alt="_"></img>
                </div>
                <div className="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="students">STUDENTS</Link>
                        <p>{studentsText}</p>
                    </div>
                </div>
            </div>

            {/* SUBMISSIONS */}
            <div className="howToContributeSubmission_container">
                <div className="howToContributeSubmission_frontdrop">
                    <div className="howToContributeSubmission_header">
                        SUBMISSIONS
                    </div>
                    <div className="howToContributeSubmission_body">
                        <p>{banner_card}</p>
                    </div>
                    <div className="howToContributeSubmission_body_links">
                        <Link to="/forms/contactus" className="howToContributeSubmission_submit"
                            >
                            Contact us
                        </Link>
                        <Link to="/forms/moreideas" className="howToContributeSubmission_submit"
                            >
                            Have more ideas? Tell us here
                        </Link>
                                            </div>
                </div>

            </div>
        </div>
    )
}
export default HowToContribute