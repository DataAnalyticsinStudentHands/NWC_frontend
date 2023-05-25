import React, { useEffect, useState } from 'react';

import './ResourceStudents.css';
import colorCorner from "../res/colorCorner.png"
import colorCornerStudent from "../res/colorCornerStudent.png"
import ReactPlayer from 'react-player';
import ContributeIcons from '../../../contributeIcons/contributeIcons';
import ResourcesFor from '../../../Components/ResourcesFor/ResourcesFor';

function ResourceStudents() {

    // state to hold content from Strapi
    const [state, setState] = useState({
        Resources_for_Students_Text: '',
        Video_Url_Students: '',
        Pdf_How_to_Contribute_Oral_Histories_Students_Researchers: '',
        Pdf_How_to_Contribute_Biographies_Students_Researchers: '',
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
                            Resources_for_Students_Text,
                            Video_Url_Students,
                            Pdf_How_to_Contribute_Biographies_Students_Researchers,
                            Pdf_How_to_Contribute_Oral_Histories_Students_Researchers,
                            Pdf_Technical_Guidelines,
                            Pdf_Permission_Documents
                        }
                    }
                } = data
                setState({
                    Resources_for_Students_Text: Resources_for_Students_Text,
                    Video_Url_Students: Video_Url_Students,
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
            <div className="colorRibbonContainer">
                <div className="colorRibbonTopRight">
                    <img src={colorCorner} alt="Color banner top right"></img>
                </div>
            </div>

            {/* BANNER */}
            <div className="researchersBanner">
                <ResourcesFor type='students' resourceText={state.Resources_for_Students_Text}/>
            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={state.Video_Url_Students}
                    controls={true}
                    width='1177px'
                    height='710px'
                />
            </div>

            {/* RESEARCHER ICONS */}
            <ContributeIcons type='students' data={state}/>

            {/* COLOR CORNER TOP RIGHT */}
            <div className="colorRibbonStudentContainer">
                <div className="colorRibbonStudentBL">
                    <img src={colorCornerStudent} alt="Color banner bottom left"></img>
                </div>
            </div>

        </div>
    )
}
export default ResourceStudents