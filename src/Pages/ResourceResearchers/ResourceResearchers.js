import React, { useEffect, useState } from 'react';
import VARIABLES from '../../config/.env';
import './ResourceResearchers.css';
import researcher_button from "./res/researcher_button.png"

import ReactPlayer from 'react-player';

const getWhere = (data, key, value) => {
    return data.filter(e => e[key] === value);
}

function ResourceResearchers() {

    const [banner_card, setBannerText] = useState("The information on this page is intended to help orient researchers interested in contributing to this NEH-sponsored project and using it to advance their own work. If you are working on a project that connects to the National Women’s Conference, we want to know about it. We also welcome thematic essays from researchers for consideration for publication on our website, but please reach out first to make sure an essay on your topic of interest is not already in the editing pipeline. We created the demographic dataset to function equally as a source for teachers and researchers, and we encourage researchers to be creative in how this data can be mined to better understand late twentieth century American politics.");
    const [imgCredit, setBannerImageCredit] = useState("");
    const [imgCredit_more, setBannerImageCredit_more] = useState("");
    const [researchersText, setResearchersText] = useState("");


    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-how-to-contribute"].join('/'))
            .then(res => res.json())
            .then(data => {

                // setBannerText(
                //     data.BannerText
                // );
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
        <div className="resrouceResearchers">

            {/* BANNER */}
            <div className="researchersBanner">
                <img src={researcher_button} alt="Researcher Button" />
                <div className="researcherBannerHeader">
                    <h1>RESOURCES FOR RESEARCHERS</h1>
                    <div className="researchersBanner_border"></div>
                    <div className="researchersBannerText">
                <h2>{banner_card}</h2>
                </div>
                </div>
                {/* <LCard text={banner_card} /> */}
            </div>

            {/* VIDEO PLAYER */}
            <div className="resourceVideoPlayer">
                <h2>VIDEO PLAYER</h2>
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=mV0bUQpz468'}
                    controls={true}
                />
            
            </div>

            {/* RESEARCHER ICONS */}
            <div className="resourceResearchersIcons">
                <div className="iconContainer">
                    <img src={researcher_button} alt="_"></img>
                    <p>How to Contribute Oral Histories</p>  
                </div>
                <div className="iconContainer">
                    <img src={researcher_button} alt="_"></img>
                    <p>How to Contribute Oral Histories</p>  
                </div>
                <div className="iconContainer">
                    <img src={researcher_button} alt="_"></img>  
                    <p>How to Contribute Oral Histories</p>
                </div>
                <div className="iconContainer">
                    <img src={researcher_button} alt="_"></img>
                    <p>How to Contribute Oral Histories</p>  
                </div>
            </div>


            {/* MORE IDEAS CONTAINER */}
            <div className="resourceResearchersMoreIdeasContainer">
                    <div className="resourceResearchersMoreIdeasContents">
                    <img src={researcher_button} alt="_"></img>
                        <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                    </div>
            </div>
        </div>
    )
}
export default ResourceResearchers