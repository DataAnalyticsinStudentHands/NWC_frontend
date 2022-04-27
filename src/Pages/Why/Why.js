import React, { useEffect, useState } from 'react'
import "./Why.css";
import buttonwhy from "../../res/button-why-the-nwc-matters.png";
import whybannerhuman from "./res/whybannerhuman.png";
import comingsoon from "./res/comingsoon_thumb.png";
import VARIABLES from '../../config/.env';
import { Link } from 'react-router-dom';
import InfoVideo from "../../Components/Avalon/InfoVideo";

//Clean up lorem ipsum
//Casing 
function Why() {
    const [pageState, setPageState] = useState({
        historicalOverview: "",
        bannerPhotoCredit: "",
        bannerPhotoCredit_more: "",
        timelineIframeSrc: "",
        documents: [],
        videoURL: "",
        videoTitle: "",
    });

    const [essays, setEssays] = useState([[]]);

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-why-the-nwc-matters"].join('/'))
        .then(res => res.json())
        .then(data => {
            
            const primaryDocuments = data.PrimaryDocuments.map(pd => {
                // [THUMBNAIL, PDF]    
                const thumbnail = [VARIABLES.fetchBaseUrl, pd.THUMBNAIL[0].url].join('');
                const pdf = [VARIABLES.fetchBaseUrl, pd.PDF[0].url].join('');

                return [thumbnail, pdf];
            });

            setPageState({
                historicalOverview: data.HistoricalOverview,
                bannerPhotoCredit: data.BannerPhotoCredit,
                bannerPhotoCredit_more: data.BannerPhotoCredit_more,
                timelineIframeSrc: data.TimelineIframeSrc,
                documents: primaryDocuments,
                videoURL: data.VideoURL,
                videoTitle: data.VideoTitle,
            })
        })
        .catch(err => console.log(err));
        window.scrollTo(0, 0);
    }, []); // eslint-disable-line

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-essays"].join('/'))
        .then(res => res.json())
        .then(data => {
            setEssays(
                data.map(d => {
                    const featured = d.Featured;
                    const thumbnail = [VARIABLES.fetchBaseUrl, d.Thumbnail.url].join('')
                    const id = d._id;
                    const title = d.ShortTitle;

                    return [id, thumbnail, title, featured];
                })
            )
        })
        .catch(err => console.log(err));
    }, []); // eslint-disable-line

    function EssayList(props) {
        const essays = props.essays;
        const listItems = essays.filter(essay => essay[3] === true)
            .map((essay) => 
            <div key={essay[0]} className="thumb_with_title">
                <Link to={`essay?id=${essay[0]}`}>
                    <img src={essay[1]} alt="" key={essay[0]} />
                    <h3 className="thumb_with_title_h3">{essay[2]}</h3>
                </Link>
            </div>
        );
        return (listItems);
    }

    return (
        <div className="why">
            {/**BANNER */}
            <div className="whyBanner">
                <img className="whyBanner_button" src={buttonwhy} alt=""/>
                <div className="whyBanner_card">
                    <h2>HISTORICAL OVERVIEW</h2>
                    <p>{pageState.historicalOverview}</p>
                    <Link to="/Essay?id=6195463454e8a217c0d07075">
                        <p className="why_readmore" >READ MORE</p>
                    </Link>
                </div>
                <figure>
                    <img src={whybannerhuman} alt=""/>
                    <figcaption title={pageState.bannerPhotoCredit_more}>
                        {pageState.bannerPhotoCredit}
                    </figcaption>
                </figure>
            </div>

            {/**VIDEO */}
            <div className="whyoutsideVideo">
                <div className="whyVideo">
                    <InfoVideo src={pageState.videoURL} title={pageState.videoTitle} />
                </div>
            </div>

            {/**TIMELINE */}
            <iframe className="" title="Timeline Iframe" 
                src={pageState.timelineIframeSrc} 
                width='100%' height='650' 
                webkitallowfullscreen="true" 
                mozallowfullscreen="true" 
                allowFullScreen 
                frameBorder='0'>
            </iframe> 


            <div className="whylowerSection">
                {/**ESSAYS */}
                <div className="whyEssays">
                    <h2>FEATURED ESSAYS</h2>
                    <div className="whyEssays_list">
                        <EssayList essays={essays} />,
                        <div className="thumb_with_title">
                            <img src={comingsoon} alt="" />
                            <h3 className="thumb_with_title_h3">Coming soon</h3>
                        </div>
                    </div>
                </div>

                {/**PUBLICATIONS */}
                <div className="whyPublications">
                    <h2>CONFERENCE PUBLICATIONS</h2>
                    <div className="whyPublications_list">
                        {pageState.documents.map(d => <a  key={d[1]} href={d[1]}>
                            <img key={d[0]} src={d[0]} alt="" />
                        </a>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Why
