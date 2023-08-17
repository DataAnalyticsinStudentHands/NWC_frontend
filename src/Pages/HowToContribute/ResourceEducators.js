import React, { useEffect, useState } from 'react';

import './ResourceEducators.css';
import dotRed from "./res/dotRed.png"
import dotBlue from "./res/dotBlue.png"
import ReactPlayer from 'react-player';
import ContribIcons from './Components/ContribIcons';
import ResourcesFor from './Components/ResourcesFor';

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
        fetch([process.env.REACT_APP_API_URL, "api/content-toolkit?populate=*"].join('/'))
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
                    Pdf_Permission_Documents: Pdf_Permission_Documents ? process.env.REACT_APP_API_URL + Pdf_Permission_Documents.data.attributes.url : undefined,
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
            <ContribIcons type='educators' data={state}/>

            {/* COLOR CORNER TOP RIGHT */}
            <div className="dotBlueEducator">
                <img src={dotBlue} alt="Blue Dot Background"></img>
            </div>

        </div>
    )
}
export default ResourceEducators