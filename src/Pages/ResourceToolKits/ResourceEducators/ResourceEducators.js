import React, { useEffect, useState } from 'react';
import VARIABLES from '../../../config/.env';
import './ResourceEducators.css';
import oralIcon from "../res/oralIcon.png"
import iconClass from "../res/iconClass.png"
import dotRed from "../res/dotRed.png"
import dotBlue from "../res/dotBlue.png"
import techIcon from "../res/techIcon.png"
import educators_button from "../res/educators_button.png"
import permissionIcon from "../res/permissionIcon.png"
import contributeIcon from "../res/contributeIcon.png"
import ideaIcon from "../res/ideaIcon.png"
import ReactPlayer from 'react-player';

function ResourceEducators() {

    const [resourcesEducatorsText, setResourcesEducatorssText] = useState("");
    const [resourcesEducatorsVideo , setResourcesStudentsVideo] = useState("");

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-toolkits"].join('/'))
            .then(res => res.json())
            .then(data => {

                setResourcesEducatorssText(
                    data.Resources_for_Educators_Text
                );
                setResourcesStudentsVideo(
                    data.Video_Url_Educators
                );
            })
    }, []);

    return (
        <div className="resourceNWC">

        {/* COLOR CORNER TOP RIGHT */}
        <div className="dotRedEducator">
            <img src={dotRed} alt="Red Dot Background"></img>
        </div>

        {/* BANNER */}
        <div className="resourceNWCBanner">
            <div className="resourceNWCBanner_button">
                <img src={educators_button} alt="NWC Button" />
            </div>
            <div className="resourceNWCBanner_header">
                <h1>RESOURCES FOR EDUCATORS</h1>
            <div className="resourceNWCBanner_border"></div>
                <p>{resourcesEducatorsText}</p>
            </div>

        </div>

        {/* VIDEO PLAYER */}
        <div className="resourceVideoPlayer">
            <h2>VIDEO PLAYER</h2>
            <ReactPlayer
                url={resourcesEducatorsVideo}
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
                <img src={iconClass} alt="_"></img>  
                <p>Classroom Ideas</p>
            </div>
        </div>

        <div className="resourceNWCIconsBottom">
            <div className="iconContainer">
                <img src={techIcon} alt="_"></img>
                <p>Technical Guidelines</p>  
            </div>
            <div className="iconContainer">
                <img src={permissionIcon} alt="_"></img>
                <p>Permissions Documents</p>  
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
        <div className="dotBlueEducator">
            <img src={dotBlue} alt="Blue Dot Background"></img>
        </div>

    </div>
    )
}
export default ResourceEducators