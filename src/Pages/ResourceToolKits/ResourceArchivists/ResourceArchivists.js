import React, { useEffect, useState } from 'react';
import VARIABLES from '../../../config/.env';
import './ResourceArchivists.css';
import archivists_button from "../res/archivist_button.png"
import archivalIcon from "../res/archivalIcon.png"
import colorCorner from "../res/colorCorner.png"
import techIcon from "../res/techIcon.png"
import permissionIcon from "../res/permissionIcon.png"
import ideaIcon from "../res/ideaIcon.png"

import ReactPlayer from 'react-player';

const getWhere = (data, key, value) => {
    return data.filter(e => e[key] === value);
}

function ResourceArchivists() {

    const [resourcesArchivistsText, setResorcesArchivistsText] = useState("");
    const [imgCredit, setBannerImageCredit] = useState("");
    const [imgCredit_more, setBannerImageCredit_more] = useState("");
    const [researchersText, setResearchersText] = useState("");


    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-toolkits"].join('/'))
            .then(res => res.json())
            .then(data => {

                setResorcesArchivistsText(
                    data.Resources_for_Archivists_Text
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
            })
    }, []);

    return (
        <div className="resourceArchivists">

            {/* COLOR CORNER TOP RIGHT */}
            <div className="colorRibbonArchContainer">
                <div className="colorRibbonArchTopRight">
                    <img src={colorCorner} alt="Color banner top right"></img>
                </div>
            </div>

            {/* BANNER */}
            <div className="archivistsBanner">
                <div className="archivistsBanner_button">
                    <img src={archivists_button} alt="Archivists Button" />
                </div>
                <div className="archivistsBanner_header">
                    <h1>RESOURCES FOR ARCHIVISTS</h1>
                <div className="archivistsBanner_border"></div>
                    <p>{resourcesArchivistsText}</p>
                </div>
                {/* <LCard text={banner_card} /> */}
            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=mV0bUQpz468'}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            
            </div>

            {/* RESEARCHER ICONS */}
            <div className="archivistsBannerIcons">
                <div className="iconContainer">
                    <img src={archivalIcon} alt="_"></img>
                    <p>How to Contribute Archival Information</p>  
                </div>
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
            <div className="ideaContainerArchivists">
                <div className="ideaContainerIcon">
                    <img src={ideaIcon} alt="_"></img>
                </div>
                <div className="ideaContainerText">
                    <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                </div>
            </div>

            {/* COLOR CORNER TOP RIGHT */}
            <div className="colorRibbonArchContainer">
                <div className="colorRibbonArchRibbonBL">
                    <img src={colorCorner} alt="Color banner bottom left"></img>
                </div>
            </div>

        </div>
    )
}
export default ResourceArchivists