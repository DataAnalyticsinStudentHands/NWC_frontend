import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VARIABLES from '../../config/.env';
import './HowToContribute.css';
import htcBannerPic from "./res/htcBannerPic.png"
import archivists_button from "./res/archivists_button.png"
import researcher_button from "./res/researcher_button.png"
import educators_button from "./res/educators_button.png"
import students_button from "./res/students_button.png"
import nwc_button from "./res/nwc_participants_button.png"
import how_to_contribute_button from "../../res/button-how-to-contribute.png"
import favInsta from "./res/favInsta.png"
import favFace from "./res/favFace.png"
import favTwitter from "./res/favTwitter.png"
import favShare from "./res/favShare.png"
import LCard from "../../Components/LCard/LCard";
import CaptionedImg from "../../Components/CaptionedImg/CaptionedImg";

const getWhere = (data, key, value) => {
    return data.filter(e => e[key] === value);
}

function HowToContribute() {

    const [facebookLink, setFacebookLink] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [twitterLink, setTwitterLink] = useState("");

    const [banner_card, setBannerText] = useState("");
    const [imgCredit, setBannerImageCredit] = useState("");
    const [imgCredit_more, setBannerImageCredit_more] = useState("");
    const [researchersText, setResearchersText] = useState("");
    const [nwcParticipantsText, setNwcParticipantsText] = useState("");
    const [educatorsText, setEducatorsText] = useState("");
    const [studentsText, setStudentsText] = useState("");
    const [archivistsText, setArchivistsText] = useState("");


    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-how-to-contribute"].join('/'))
            .then(res => res.json())
            .then(data => {

                setBannerText(
                    data.BannerText
                );
                setBannerImageCredit(
                    data.BannerImageCredit
                );
                setBannerImageCredit_more(
                    data.BannerImageCredit_more
                );
                setResearchersText(
                    data.ResearchersText
                );
                setNwcParticipantsText(
                    data.NwcParticipantsText
                );
                setEducatorsText(
                    data.EducatorsText
                );
                setStudentsText(
                    data.StudentsText
                );
                setArchivistsText(
                    data.ArchivistsText
                );
            })
    }, []);

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-footers"].join('/'))
            .then(response => response.json())
            .then(data => {
                const get = (section) => {
                    return getWhere(data, 'Section', section)[0]['Content'];
                };

                setFacebookLink(
                    get("FacebookLink")
                );

                setInstagramLink(
                    get("InstagramLink")
                );

                setTwitterLink(
                    get("TwitterLink")
                );

            })
    }, []);  /* eslint-disable-line */

    return (
        <div className="howToContribute">

            {/* BANNER */}
            <div className="contributeBanner">
                <img src={how_to_contribute_button} alt="How to Contribute" />
                <LCard text={banner_card} />
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
                    {/* <div className="howToContributeInvolved_favFace">
                        <a href={facebookLink}><img src={favFace} alt="facebook_logo" /></a>
                    </div>
                    <div className="howToContributeInvolved_favTwitter">
                        <a href={twitterLink}><img src={favTwitter} alt="twitter_logo" /></a>
                    </div>
                    <div className="howToContributeInvolved_favInsta">
                        <a href={instagramLink}><img src={favInsta} alt="instagram_logo" /></a>
                    </div>
                    <div className="howToContributeInvolved_favShare">
                        <a href={instagramLink}><img src={favShare} alt="share_logo" /></a>
                    </div> */}
                </div>
            </div>

            {/* HOW TO GET INVOLVED LIST */}
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherBtn">
                    <img src={researcher_button} alt="_"></img>
                </div>
                <div class="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                        <Link to="/ResourceResearchers">RESEARCHERS</Link>
                        <p>{researchersText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={archivists_button} alt="_"></img>
                </div>
                <div class="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="/ResourceArchivists">ARCHIVISTS</Link>
                        <p>{archivistsText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={nwc_button} alt="_"></img>
                </div>
                <div class="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="/ResourceNWC">NWC PARTICIPANTS</Link>
                        <p>{nwcParticipantsText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={educators_button} alt="_"></img>
                </div>
                <div class="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="/ResourceEducators">EDUCATORS</Link>
                        <p>{educatorsText}</p>
                    </div>
                </div>
            </div>
            <div className="howToContributeInvolved_container">
                <div className="howToContributeInvolved_researcherImg">
                    <img src={students_button} alt="_"></img>
                </div>
                <div class="howToContributeInvolved_content">
                    <div className="howToContributeInvolved_researcherText">
                    <Link to="/ResourceStudents">STUDENTS</Link>
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
                        <Link to="/Forms/CorrectionsForm" className="howToContributeSubmission_submit"
                            >
                            CORRECTIONS
                        </Link>
                                            </div>
                </div>

            </div>
        </div>
    )
}
export default HowToContribute