import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import ContributeIcons from '../../../contributeIcons/contributeIcons';
import ResourcesFor from '../../../Components/ResourcesFor/ResourcesFor';


function ResourceEducators() {

    // state to hold content from Strapi
    const [state, setState] = useState({
        Resources_for_Educators_Text: '',
        Video_Url_Educators: '',
        Pdf_How_to_Contribute_Oral_Histories_Educators: '',
        Pdf_How_to_Contribute_Biographies_Educators: '',
        Pdf_Classroom_Ideas: '',
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
                            Resources_for_Educators_Text,
                            Video_Url_Educators,
                            Pdf_How_to_Contribute_Oral_Histories_Educators, 
                            Pdf_How_to_Contribute_Biographies_Educators,
                            Pdf_Classroom_Ideas,
                            Pdf_Technical_Guidelines,
                            Pdf_Permission_Documents
                        }
                    }
                } = data

                setState({
                    Resources_for_Educators_Text: Resources_for_Educators_Text,
                    Video_Url_Educators: Video_Url_Educators,
                    Pdf_How_to_Contribute_Oral_Histories_Educators: Pdf_How_to_Contribute_Oral_Histories_Educators ? Pdf_How_to_Contribute_Oral_Histories_Educators.data.attributes.url.split('/')[2] : undefined,
                    Pdf_How_to_Contribute_Biographies_Educators: Pdf_How_to_Contribute_Biographies_Educators ? Pdf_How_to_Contribute_Biographies_Educators.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Classroom_Ideas: Pdf_Classroom_Ideas ? Pdf_Classroom_Ideas.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Technical_Guidelines: Pdf_Technical_Guidelines ? Pdf_Technical_Guidelines.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Permission_Documents: Pdf_Permission_Documents ? VARIABLES.fetchBaseUrl + Pdf_Permission_Documents.data.attributes.url : undefined,
                });
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
                <ResourcesFor type='educators' resourceText={state.Resources_for_Educators_Text}/>
            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={state.Video_Url_Educators}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            </div>

            {/* RESEARCHER ICONS */}
            <ContributeIcons type='educators' data={state}/>

            {/* COLOR CORNER TOP RIGHT */}
            <div className="dotBlueEducator">
                <img src={dotBlue} alt="Blue Dot Background"></img>
            </div>

        </div>
    )
}
export default ResourceEducators