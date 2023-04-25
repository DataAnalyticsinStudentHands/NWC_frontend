import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VARIABLES from '../../../config/.env';
import './ResourceResearchers.css';
import researcher_button from "../res/researcher_button.png"
import oralIcon from "../res/oralIcon.png"
import colorCorner from "../res/colorCorner.png"
import colorCornerResearcher from "../res/colorCornerResearcher.png"
import techIcon from "../res/techIcon.png"
import permissionIcon from "../res/permissionIcon.png"
import contributeIcon from "../res/contributeIcon.png"
import ideaIcon from "../res/ideaIcon.png"
import ReactPlayer from 'react-player';
import ContributeIcons from '../../../contributeIcons/contributeIcons';


function ResourceResearchers() {

    // state to hold content from Strapi
    const [state, setState] = useState({
        Resources_for_Researchers_Text: '',
        Video_Url_Researchers: '',
        Pdf_How_to_Contribute_Oral_Histories_Students_Researchers: '',
        Pdf_How_to_Contribute_Biographies_Students_Researchers: '',
        Pdf_Technical_Guidelines: '',
        Pdf_Permission_Documents: ''
    });

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "api/content-toolkit?populate=*"].join('/'))
            .then(res => res.json())
            .then(data => {
                const{data:
                        {attributes:
                            {
                                Resources_for_Researchers_Text,
                                Video_Url_Researchers,
                                Pdf_How_to_Contribute_Biographies_Students_Researchers, 
                                Pdf_How_to_Contribute_Oral_Histories_Students_Researchers, 
                                Pdf_Technical_Guidelines, 
                                Pdf_Permission_Documents
                            }}} = data
                
                            // console.log(data)
                setState({
                    Resources_for_Researchers_Text: Resources_for_Researchers_Text,
                    Video_Url_Researchers: Video_Url_Researchers,
                    Pdf_How_to_Contribute_Oral_Histories_Students_Researchers: Pdf_How_to_Contribute_Oral_Histories_Students_Researchers ? Pdf_How_to_Contribute_Oral_Histories_Students_Researchers.data.attributes.url.split('/')[2] : undefined,
                    Pdf_How_to_Contribute_Biographies_Students_Researchers: Pdf_How_to_Contribute_Biographies_Students_Researchers ? Pdf_How_to_Contribute_Biographies_Students_Researchers.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Technical_Guidelines: Pdf_Technical_Guidelines ? Pdf_Technical_Guidelines.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Permission_Documents: Pdf_Permission_Documents ? VARIABLES.fetchBaseUrl + Pdf_Permission_Documents.data.attributes.url : undefined,
                });
                
            })
    }, []);

    return (
        <div className="resourceResearchers">

            {/* COLOR CORNER TOP RIGHT */}
            <div className="colorRibbonTR">
                <img src={colorCorner} alt="Color banner top right"></img>
            </div>

            {/* BANNER */}
            <div className="researchersBanner">
                <div className="researchersBanner_button">
                    <img src={researcher_button} alt="Researcher Button" />
                </div>
                <div className="researchersBanner_header">
                    <h1>RESOURCES FOR RESEARCHERS</h1>
                    <div className="researchersBanner_border"></div>
                    <p>{state.Resources_for_Researchers_Text}</p>
                </div>
                {/* <LCard text={banner_card} /> */}
            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={state.Video_Url_Researchers}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            </div>

            {/* RESEARCHER ICONS */}
            {/* <div className="resourceResearchersIcons">
                <Link to={`PDFViewer/${state.Pdf_How_to_Contribute_Oral_Histories_Students_Researchers}`}>
                    <div className="iconContainer">
                        <img src={oralIcon} alt="_"></img>
                        <p>How to Contribute Oral Histories</p>
                    </div>
                </Link>
                <Link to={`PDFViewer/${state.Pdf_How_to_Contribute_Biographies_Students_Researchers}`}>
                    <div className="iconContainer">
                        <img src={contributeIcon} alt="_"></img>
                        <p>How to Contribute Biographies</p>
                    </div>
                </Link>
                <Link to={`PDFViewer/${state.Pdf_Technical_Guidelines}`}>
                    <div className="iconContainer">
                        <img src={techIcon} alt="_"></img>
                        <p>Technical Guidelines</p>
                    </div>
                </Link>
                <a href={`${state.Pdf_Permission_Documents}`} download>
                    <div className="iconContainer">
                        <img src={permissionIcon} alt="_"></img>
                        <p>Permissions Documents</p>
                    </div>
                </a>

            </div> */}
            <ContributeIcons type='researchers' data={state} />

            {/* MORE IDEAS CONTAINER */}
            <Link to="/Forms/MoreIdeasForm">
                <div className="ideaContainerResearch">
                    <div className="ideaContainerIcon">
                        <img src={ideaIcon} alt="_"></img>
                    </div>
                    <div className="ideaContainerText">
                        <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                    </div>
                </div>
            </Link>

            {/* COLOR CORNER TOP RIGHT */}
            <div className="colorRibbonResearchersContainer">
                <div className="colorRibbonResearchersBL">
                    <img src={colorCornerResearcher} alt="Color banner bottom left"></img>
                </div>
            </div>

        </div>
    )
}
export default ResourceResearchers