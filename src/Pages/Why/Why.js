import React, { useEffect, useState } from 'react'
import "./Why.css";
import buttonwhy from "../../res/button-why-the-nwc-matters.png";
import whybannerhuman from "./res/whybannerhuman.png";
import comingsoon from "./res/comingsoon_thumb.png";
import VARIABLES from '../../config/.env';
import { Link } from 'react-router-dom';
import InfoVideo from "../../Components/Avalon/InfoVideo";



function Why() {
    const [pageState, setPageState] = useState({
        HistoricalOverview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        BannerPhotoCredit: "Photo by Jane Doe",
        BannerPhotoCredit_more: "More Stuff",
        TimelineIframeSrc: "https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1Yjky3oa3s751TooQVoeVZasxl98_i8EcjTAqo896d1s&font=Default&lang=en&initial_zoom=2&height=650",
        documents: [],
        videoURL: " https://av.lib.uh.edu:443/master_files/nk322d406/embed",
        videoTitle: "Video Title",
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
                HistoricalOverview: data.HistoricalOverview,
                BannerPhotoCredit: data.BannerPhotoCredit,
                BannerPhotoCredit_more: data.BannerPhotoCredit_more,
                TimelineIframeSrc: data.TimelineIframeSrc,
                documents: primaryDocuments,
                videoURL: data.videoURL,
                videoTitle: data.videoTitle,
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
                    <p>{pageState.HistoricalOverview}</p>
                    <Link to="/Essay?id=6195463454e8a217c0d07075">
                        <p className="why_readmore" >READ MORE</p>
                    </Link>
                </div>
                <figure>
                    <img src={whybannerhuman} alt=""/>
                    <figcaption title={pageState.BannerPhotoCredit_more}>
                        {pageState.BannerPhotoCredit}
                    </figcaption>
                </figure>
            </div>

            {/**VIDEO */}
            <div className="whyoutsideVideo">
                <div className="whyVideo">
                    <InfoVideo src={pageState.videoSRC} title={pageState.videoTitle} />
                </div>
            </div>

            {/**TIMELINE */}
            <iframe className="" title="Timeline Iframe" 
                src={pageState.TimelineIframeSrc} 
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
