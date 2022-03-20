import React, { useEffect, useState } from 'react';
import VARIABLES from '../../../../config/.env';
import './ResourceNWC.css';
import nwc_participants_button from "./res/nwc_participants_button.png"
import oralIcon from "./res/oralIcon.png"
import iconPapers from "./res/iconPapers.png"
import dotRed from "./res/dotRed.png"
import dotBlue from "./res/dotBlue.png"
import techIcon from "./res/techIcon.png"
import permissionIcon from "./res/permissionIcon.png"
import contributeIcon from "./res/contributeIcon.png"
import ideaIcon from "./res/ideaIcon.png"
import ReactPlayer from 'react-player';

function ResourceNWC() {

    const [resourcesParticipantsText, setResourcesParticipantsText] = useState("");
    const [resourcesStudentsVideo , setResourcesStudentsVideo] = useState("");


    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-toolkits"].join('/'))
            .then(res => res.json())
            .then(data => {

                setResourcesParticipantsText(
                    data.Resources_for_Participants_Text
                );
                setResourcesStudentsVideo(
                    data.Video_Url_Participants
                );
            })
    }, []);

    return (
        <div className="resourceNWC">

            {/* COLOR CORNER TOP RIGHT */}
            <div className="dotBlue">
                <img src={dotBlue} alt="Blue Dot Background"></img>
            </div>

            {/* BANNER */}
            <div className="resourceNWCBanner">
                <div className="resourceNWCBanner_button">
                    <img src={nwc_participants_button} alt="NWC Button" />
                </div>
                <div className="resourceNWCBanner_header">
                    <h1>RESOURCES FOR NWC PARTICIPANTS</h1>
                <div className="resourceNWCBanner_border"></div>
                    <p>{resourcesParticipantsText}</p>
                </div>

            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={resourcesStudentsVideo}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            
            </div>

            {/* RESEARCHER ICONS */}
            <div className="resourceNWCIconsTop">
                <div className="iconContainer">
                    <img src={oralIcon} alt="_"></img>
                    <p>How to Contribute Oral Histories</p>  
                </div>
                <div className="iconContainer">
                    <img src={contributeIcon} alt="_"></img>
                    <p>How to Contribute Biographies</p>  
                </div>
                <div className="iconContainer">
                    <img src={techIcon} alt="_"></img>  
                    <p>Technical Guidelines</p>
                </div>
            </div>

            <div className="resourceNWCIconsBottom">
                <div className="iconContainer">
                    <img src={permissionIcon} alt="_"></img>
                    <p>Permissions Documents</p>  
                </div>
                <div className="iconContainer">
                    <img src={iconPapers} alt="_"></img>
                    <p>HOW TO DONATE YOUR PAPERS</p>  
                </div>
            </div>

            {/* MORE IDEAS CONTAINER */}
            <div className="ideaContainerNWC">
                <div className="ideaContainerIcon">
                    <img src={ideaIcon} alt="_"></img>
                </div>
                <div className="ideaContainerText">
                    <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                </div>
            </div>

            {/* COLOR CORNER TOP RIGHT */}
            <div className="dotRed">
                <img src={dotRed} alt="Red Dot Background"></img>
            </div>

        </div>
    )
}
export default ResourceNWC