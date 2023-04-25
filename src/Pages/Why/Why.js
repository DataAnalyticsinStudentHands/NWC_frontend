import React, { useEffect, useState } from 'react'
import "./Why.css";
import buttonwhy from "../../res/button-why-the-nwc-matters.png";
import whybannerhuman from "./res/whybannerhuman.png";
// import comingsoon from "./res/comingsoon_thumb.png";
import VARIABLES from '../../config/.env';
import { Link } from 'react-router-dom';
import InfoVideo from "../../Components/Avalon/InfoVideo";
import Carousel3 from '../../Components/Carousel/Carousel3';

//Clean up lorem ipsum
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
        fetch([VARIABLES.fetchBaseUrl, "api/content-why-the-nwc-matter?populate[PrimaryDocuments][populate]=*"].join('/'))
        .then(res => res.json())
        .then(data => {
            const {data:
                    {attributes:
                        {PrimaryDocuments, HistoricalOverview, BannerPhotoCredit, BannerPhotoCredit_more, 
                            TimelineIframeSrc, VideoURL, VideoTitle}}} = data;

            //thumbnails and pdfs should prop be in an array                
            const primaryDocuments = PrimaryDocuments.map(pd => {
                
                // [THUMBNAIL, PDF]    
                const thumbnail = [VARIABLES.fetchBaseUrl, pd.THUMBNAIL.data.attributes.url].join('');
                const pdf = [VARIABLES.fetchBaseUrl, pd.PDF.data.attributes.url].join('');

                return [thumbnail, pdf];
            });

            setPageState({
                historicalOverview: HistoricalOverview,
                bannerPhotoCredit: BannerPhotoCredit,
                bannerPhotoCredit_more: BannerPhotoCredit_more,
                timelineIframeSrc: TimelineIframeSrc,
                documents: primaryDocuments,
                videoURL: VideoURL,
                videoTitle: VideoTitle,
            })
        })
        .catch(err => console.log(err));
        window.scrollTo(0, 0);
    }, []); // eslint-disable-line

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "api/content-essays?populate=*"].join('/'))
        .then(res => res.json())
        .then(data => {
            setEssays(
                data.data.map(d => {
                    const featured = d.attributes.Featured;
                    let thumbnail = [VARIABLES.fetchBaseUrl, d.attributes.Thumbnail.data.attributes.url].join('')
                    const id = d.id;
                    const title = d.attributes.ShortTitle;

                    return ['essay', id, thumbnail, title, featured];
                })
            )
        })
        .catch(err => console.log(err));
    }, []); // eslint-disable-line

    // function EssayList(props) {
    //     const essays = props.essays;
    //     const listItems = essays.filter(essay => essay[3] === true)
    //         .map((essay) => 
    //         <div key={essay[0]} className="thumb_with_title">
    //             <Link to={`essay?id=${essay[0]}`}>
    //                 <img src={essay[1]} alt="" key={essay[0]} />
    //                 <h3 className="thumb_with_title_h3">{essay[2]}</h3>
    //             </Link>
    //         </div>
    //     );
    //     return (listItems);
    // }

    return (
        <div className="why">
            {/**BANNER */}
            <div className="whyBanner">
                <img className="whyBanner_button" src={buttonwhy} alt=""/>
                <div className="whyBanner_card">
                    <h2>HISTORICAL OVERVIEW</h2>
                    <p>{pageState.historicalOverview}</p>
                    <Link to="/Essay?id=1">
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
                    <div className='whyEssays_list'>
                        <Carousel3 images={essays}/>
                        </div>
                        {/* <EssayList essays={essays} />,
                        <div className="thumb_with_title">
                            <img src={comingsoon} alt="" />
                            <h3 className="thumb_with_title_h3">Coming soon</h3>
                        </div> */}
                    
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
