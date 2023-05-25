import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import ResourcesFor from '../../../Components/ResourcesFor/ResourcesFor';


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
        fetch([process.env.REACT_APP_API_URL, "api/content-toolkit?populate=*"].join('/'))
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
                    Pdf_Permission_Documents: Pdf_Permission_Documents ? process.env.REACT_APP_API_URL + Pdf_Permission_Documents.data.attributes.url : undefined,
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
                <ResourcesFor type='researchers' resourceText={state.Resources_for_Researchers_Text}/>
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

            <ContributeIcons type='researchers' data={state} />

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