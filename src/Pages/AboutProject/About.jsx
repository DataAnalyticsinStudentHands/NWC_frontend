import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./About.css";

import button from "./res/AboutProjectButton.png";
import barbarajordan from './res/barbara-jordan.png';
import tl from './res/timeline.png';
import BannerCard from "../../Components/BannerCard/BannerCard";
import CaptionedImg from "../../Components/CaptionedImg/CaptionedImg";
import VideoReel from "./res/Video Reel.svg";
import MeetTheTeam from './MeetTheTeam/MeetTheTeam';
import ReactPlayer from "react-player";
import placeholder from '../OralHistories/res/video_placeholder.png';
import verticaltl from './res/Vertical Timeline.png'
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';

function About() {
  // one state to hold the regular page content loaded from Strapi
  const [state, setState] = useState({
    aboutBanner_card: '',
    bannerimage_credit: '',
    bannerimagecredit_more: '',
    aboutTimeline_1: '',
    aboutTimeline_2: '',
    aboutTimeline_3: '',
    aboutTimeline_4: '',
    aboutTimeline_5: '',
    aboutDocuments_ddlink: '',
    aboutDocuments_cblink: '',
    aboutDocuments_aplink: '',
    aboutDocuments_frlink: '',
    aboutDocuments_collectionsGuide:''
  });

  // grab page data from strapi
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/content-about?populate=*`)
      .then(res => res.json())
      .then(data => {
        
        const {data:
                {attributes:
                  {
                    Banner_text, BannerImage_Credit, BannerImageCredit_more, aboutTimeline_1, aboutTimeline_2, aboutTimeline_3, aboutTimeline_4, aboutTimeline_5, 
                    aboutDocuments_cblink, aboutDocuments_frlink, aboutDocuments_eclink, aboutDocuments_fmlink, 
                    aboutDocuments_tblink, aboutDocuments_tdlink,aboutDocuments_edlink ,aboutDocuments_ddlink, 
                    aboutDocuments_collectionsGuide,
                    aboutDocuments_aplink, BehindTheScenes_Video1, BehindTheScenes_Video2
                  }
                }
              } = data;
              
        setState({
          banner_text: Banner_text,
          bannerimage_credit: BannerImage_Credit,
          bannerimagecredit_more: BannerImageCredit_more,
          aboutTimeline_1: aboutTimeline_1,
          aboutTimeline_2: aboutTimeline_2,
          aboutTimeline_3: aboutTimeline_3,
          aboutTimeline_4: aboutTimeline_4,
          aboutTimeline_5: aboutTimeline_5,
          aboutDocuments_cblink: aboutDocuments_cblink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_cblink.data.attributes.url : undefined,
          aboutDocuments_aplink: aboutDocuments_aplink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_aplink.data.attributes.url : undefined,
          aboutDocuments_frlink: aboutDocuments_frlink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_frlink.data.attributes.url : undefined,
          aboutDocuments_eclink: aboutDocuments_eclink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_eclink.data.attributes.url : undefined,
          aboutDocuments_fmlink: aboutDocuments_fmlink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_fmlink.data.attributes.url : undefined,
          aboutDocuments_tblink: aboutDocuments_tblink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_tblink.data.attributes.url : undefined,
          aboutDocuments_tdlink: aboutDocuments_tdlink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_tdlink.data.attributes.url : undefined,
          aboutDocuments_edlink: aboutDocuments_edlink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_edlink.data.attributes.url : undefined,
          aboutDocuments_ddlink: aboutDocuments_ddlink.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_ddlink.data.attributes.url : undefined,
          aboutDocuments_collectionsGuide: aboutDocuments_collectionsGuide.data !== null ? import.meta.env.VITE_API_URL + aboutDocuments_collectionsGuide.data.attributes.url: undefined,
          BehindTheScenes_Video1: BehindTheScenes_Video1,
          BehindTheScenes_Video2: BehindTheScenes_Video2
        });
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  return (
    <div className="about">
      <ScrollToTop />
      {/**BANNER */}
      <div className="aboutBanner">
        <img src={button} alt="_" />
        <BannerCard text={state.banner_text} />
        <CaptionedImg
          src={barbarajordan} 
          caption={"Photo by " + state.bannerimage_credit}
          caption_more={state.bannerimagecredit_more} />
      </div>

      {/**TIMELINE */}
      <div className="aboutTimeline">
        <div className="aboutHead"><h1>PROJECT TIMELINE</h1></div>
        <div className="aboutTimeline_annot aboutTimeline_annot1">
          <div className="aboutTimeline_annotNo"><p>1</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_1}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot2">
          <div className="aboutTimeline_annotNo"><p>2</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_2}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot3">
          <div className="aboutTimeline_annotNo"><p>3</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_3}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot4">
          <div className="aboutTimeline_annotNo"><p>4</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_4}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot5">
          <div className="aboutTimeline_annotNo"><p>5</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_5}</div>
        </div>
        <div className="timelineWrapper">
          <img src={tl} className="aboutTimeline_tl" alt="_" />
          <img src={verticaltl} className="aboutTimeline_tl2" alt="_" />
          </div>
      </div>

      {/**DOCUMENTS */}
      <div className="aboutHead"><h1>PROJECT GUIDING PRINCIPLES</h1></div>
      <div className="aboutDocuments">
      {state.aboutDocuments_fmlink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_fmlink.split('/')[4]}`}>
            <div>
            FEMINIST DH MANIFESTA
            </div>
          </Link>
        }
        {state.aboutDocuments_eclink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_eclink.split('/')[4]}`}>
            <div>
              ETHICS OF CARE
            </div>
          </Link>
        }
         {state.aboutDocuments_cblink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_cblink.split('/')[4]}`}>

            <div>
              CODEBOOK
            </div>
          </Link>
        }
        {state.aboutDocuments_tdlink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_tdlink.split('/')[4]}`}>
            <div>
              TERMINOLOGY DOCUMENT
            </div>
          </Link>
        }
        {state.aboutDocuments_tblink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_tblink.split('/')[4]}`}>
            <div>
              TECHNOLOGY BACKGROUND
            </div>
          </Link>
        }
        {state.aboutDocuments_ddlink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_ddlink.split('/')[4]}`}>
            <div>
              STYLE DOCUMENT
            </div>
          </Link>
        }
        {state.aboutDocuments_edlink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_edlink.split('/')[4]}`}>
            <div>
              EDITING PROCEDURES
            </div>
          </Link>
        }
        {state.aboutDocuments_frlink &&
          <Link to={`/pdfviewer/${state.aboutDocuments_frlink.split('/')[4]}`}>
            <div>
              FURTHER READING
            </div>
          </Link>
        }
        {state.aboutDocuments_collectionsGuide  &&
          <Link to={`/pdfviewer/${state.aboutDocuments_collectionsGuide.split('/')[4]}`}>
            <div>
              COLLECTIONS GUIDE
            </div>
          </Link>
        }
      </div>
      
      { /* LOOK BEHIND THE SCENES */}
      <img src={VideoReel} className="aboutVideoReel" alt="Video Reel" />
      <div className="aboutHead"><h1>LOOK BEHIND THE SCENES</h1></div>

      <div className="behindTheScenesGrid">
        <div className="behindTheScenesItem">
          {state.BehindTheScenes_Video1 ? (
            <ReactPlayer
              url={state.BehindTheScenes_Video1}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            <img
              src={placeholder}
              alt="Behind the scenes video coming soon"
              className="videoPlaceholder"
            />
          )}
        </div>

        <div className="behindTheScenesItem">
          {state.BehindTheScenes_Video2 ? (
            <ReactPlayer
              url={state.BehindTheScenes_Video2}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            <img
              src={placeholder}
              alt="Behind the scenes video coming soon"
              className="videoPlaceholder"
            />
          )}
        </div>
      </div>

      {/**MEET */}
      <MeetTheTeam />

    </div>
  )
}

export default About
