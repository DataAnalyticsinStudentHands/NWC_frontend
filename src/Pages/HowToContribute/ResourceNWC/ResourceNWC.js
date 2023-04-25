import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VARIABLES from '../../../config/.env';
import './ResourceNWC.css';
import nwc_participants_button from "../res/nwc_participants_button.png"
import oralIcon from "../res/oralIcon.png"
import iconPapers from "../res/iconPapers.png"
import dotRed from "../res/dotRed.png"
import dotBlue from "../res/dotBlue.png"
import techIcon from "../res/techIcon.png"
import permissionIcon from "../res/permissionIcon.png"
import contributeIcon from "../res/contributeIcon.png"
import ideaIcon from "../res/ideaIcon.png"
import ReactPlayer from 'react-player';
import ContributeIcons from '../../../contributeIcons/contributeIcons';


function ResourceNWC() {

    // state to hold content from Strapi
    const [state, setState] = useState({
        Resources_for_Participants_Text: '',
        Video_Url_Participants: '',
        Pdf_How_to_Contribute_Oral_Histories_NWCParticipants: '',
        Pdf_How_to_Contribute_Biographies_NWCParticipants: '',
        Pdf_Technical_Guidelines: '',
        Pdf_Permission_Documents: ''
    });

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "api/content-toolkit?populate=*"].join('/'))
            .then(res => res.json())
            .then(data => {
                const{
                    data:{
                        attributes:{
                            Resources_for_Participants_Text,
                            Video_Url_Participants,
                            Pdf_How_to_Contribute_Oral_Histories_NWCParticipants,
                            Pdf_How_to_Contribute_Biographies_NWCParticipants,
                            Pdf_Technical_Guidelines,
                            Pdf_Permission_Documents
                        }
                    }
                } = data

                setState({
                    Resources_for_Participants_Text: Resources_for_Participants_Text?Resources_for_Participants_Text:undefined,
                    Video_Url_Participants: Video_Url_Participants?Video_Url_Participants:undefined,
                    Pdf_How_to_Contribute_Oral_Histories_NWCParticipants: Pdf_How_to_Contribute_Oral_Histories_NWCParticipants.data ? Pdf_How_to_Contribute_Oral_Histories_NWCParticipants.data.attributes.url.split('/')[2] : undefined,
                    Pdf_How_to_Contribute_Biographies_NWCParticipants: Pdf_How_to_Contribute_Biographies_NWCParticipants.data ? Pdf_How_to_Contribute_Biographies_NWCParticipants.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Technical_Guidelines: Pdf_Technical_Guidelines.data ? Pdf_Technical_Guidelines.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Permission_Documents: Pdf_Permission_Documents.data ? VARIABLES.fetchBaseUrl + Pdf_Permission_Documents.data.attributes.url : undefined,
                });
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
                    <p>{state.Resources_for_Participants_Text}</p>
                </div>

            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={state.Video_Url_Participants}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            </div>

            {/* RESEARCHER ICONS */}
            <ContributeIcons type='participants' data={state}/>
            {/* <div className="resourceNWCIconsTop">
            <Link to={`PDFViewer/${state.Pdf_How_to_Contribute_Oral_Histories_NWCParticipants}`}>
                    <div className="iconContainer">
                        <img src={oralIcon} alt="_"></img>
                        <p>How to Contribute Oral Histories</p>
                    </div>
                </Link>
                <Link to={`PDFViewer/${state.Pdf_How_to_Contribute_Biographies_NWCParticipants}`}>
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
            </div>

            <div className="resourceNWCIconsBottom">
            <a href={`${state.Pdf_Permission_Documents}`} download>
                    <div className="iconContainer">
                        <img src={permissionIcon} alt="_"></img>
                        <p>Permissions Documents</p>
                    </div>
                </a>
                <Link to="/Forms/HowToDonatePapersForm">
                <div className="iconContainer">
                    <img src={iconPapers} alt="_"></img>
                    <p>HOW TO DONATE YOUR PAPERS</p>  
                </div>
                </Link>
            </div> */}

            {/* MORE IDEAS CONTAINER */}
            <div className='MoreIdeas'>
                <Link to="/Forms/MoreIdeasForm">
                <div className="ideaContainerNWC" >
                    <div className="ideaContainerIcon">
                        <img src={ideaIcon} alt="_"></img>
                    </div>
                    <div className="ideaContainerText">
                        <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                    </div>
                </div>
                </Link>

                {/* COLOR CORNER TOP RIGHT */}
                <div className="dotRed">
                    <img src={dotRed} alt="Red Dot Background"></img>
                </div>

            </div>
            

        </div>
    )
}
export default ResourceNWC