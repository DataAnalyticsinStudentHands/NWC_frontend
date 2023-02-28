import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VARIABLES from '../../../config/.env';
import './ResourceArchivists.css';
import archivists_button from "../res/archivist_button.png"
import archivalIcon from "../res/archivalIcon.png"
import colorCorner from "../res/colorCorner.png"
import techIcon from "../res/techIcon.png"
import permissionIcon from "../res/permissionIcon.png"
import ideaIcon from "../res/ideaIcon.png"

import ReactPlayer from 'react-player';

function ResourceArchivists() {

    // state to hold content from Strapi
    const [state, setState] = useState({
        Resources_for_Archivists_Text: '',
        Video_Url_Archivists: '',
        Pdf_Technical_Guidelines_Archivists: '',
        Pdf_Permission_Documents: ''
    });

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "api/content-toolkit?populate=*"].join('/'))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const {data:{attributes:{Resources_for_Archivists_Text, Video_Url_Archivists, Pdf_Permission_Documents, Pdf_Technical_Guidelines_Archivists}}} = data
                setState({
                    Resources_for_Archivists_Text: Resources_for_Archivists_Text,
                    Video_Url_Archivists: Video_Url_Archivists,
                    Pdf_Technical_Guidelines_Archivists: Pdf_Technical_Guidelines_Archivists ? Pdf_Technical_Guidelines_Archivists.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Permission_Documents: Pdf_Permission_Documents ? VARIABLES.fetchBaseUrl + Pdf_Permission_Documents.data.attributes.url : undefined,
                });
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
                    <p>{state.Resources_for_Archivists_Text}</p>
                </div>
                {/* <LCard text={banner_card} /> */}
            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={state.Video_Url_Archivists}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            </div>

            {/* RESEARCHER ICONS */}
            <div className="archivistsBannerIcons">
                <Link to="/Forms/HowToDonatePapersForm">
                    <div className="iconContainer_arch">
                        <img src={archivalIcon} alt="_"></img>
                        <p>How to Contribute Archival Information</p>
                    </div>
                </Link>
                <Link to={`PDFViewer/${state.Pdf_Technical_Guidelines_Archivists}`}>
                    <div className="iconContainer_arch">
                        <img src={techIcon} alt="_"></img>
                        <p>Technical Guidelines</p>
                    </div>
                </Link>
                <a href={`${state.Pdf_Permission_Documents}`} download>
                    <div className="iconContainer_arch">
                        <img src={permissionIcon} alt="_"></img>
                        <p>Permissions Documents</p>
                    </div>
                </a>
            </div>


            {/* MORE IDEAS CONTAINER */}
            <Link to="/Forms/MoreIdeasForm">
                <div className="ideaContainerArchivists">
                    <div className="ideaContainerIcon">
                        <img src={ideaIcon} alt="_"></img>
                    </div>
                    <div className="ideaContainerText">
                        <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                    </div>
                </div>
            </Link>

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