import React, { useEffect, useState } from 'react';
import './ResourceArchivists.css';
import colorCorner from "../res/colorCorner.png"
import ContribIcons from '../Components/ContribIcons';
import ReactPlayer from 'react-player';
import ResourcesFor from '../Components/ResourcesFor';

function ResourceArchivists() {

    // state to hold content from Strapi
    const [state, setState] = useState({
        Resources_for_Archivists_Text: '',
        Video_Url_Archivists: '',
        Pdf_Technical_Guidelines_Archivists: '',
        Pdf_Permission_Documents: ''
    });

    useEffect(() => {
        fetch([process.env.REACT_APP_API_URL, "api/content-toolkit?populate=*"].join('/'))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const {data:{attributes:{Resources_for_Archivists_Text, Video_Url_Archivists, Pdf_Permission_Documents, Pdf_Technical_Guidelines_Archivists}}} = data
                setState({
                    Resources_for_Archivists_Text: Resources_for_Archivists_Text,
                    Video_Url_Archivists: Video_Url_Archivists,
                    Pdf_Technical_Guidelines_Archivists: Pdf_Technical_Guidelines_Archivists ? Pdf_Technical_Guidelines_Archivists.data.attributes.url.split('/')[2] : undefined,
                    Pdf_Permission_Documents: Pdf_Permission_Documents ? process.env.REACT_APP_API_URL + Pdf_Permission_Documents.data.attributes.url : undefined,
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
            <div className='archivistsBanner'>
                <ResourcesFor type='archivists' resourceText={state.Resources_for_Archivists_Text}/>
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

            <ContribIcons type="archivists" data={state}/>

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