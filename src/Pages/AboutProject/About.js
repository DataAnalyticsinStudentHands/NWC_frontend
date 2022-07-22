import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./About.css";

import button from "../../res/button-50th-anniversary.png";
import barbarajordan from './res/barbara-jordan.png';
import tl from './res/timeline.png';

import VARIABLES from "../../config/.env.js";

import MeetTheTeam from '../MeetTheTeam/MeetTheTeam';

function About() {
  const { fetchBaseUrl } = VARIABLES;

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
    aboutDocuments_frlink: ''
  });

  // grab page data from strapi
  useEffect(() => {
    fetch(`${fetchBaseUrl}/api/content-about?populate=*`)
      .then(res => res.json())
      .then(data => {
        //
        const {data:
                {attributes:
                  {
                    Banner_text, BannerImageCredit, BannerImageCredit_more, aboutTimeline_1, aboutTimeline_2, aboutTimeline_3, aboutTimeline_4, aboutTimeline_5, 
                    aboutDocuments_cblink, aboutDocuments_frlink, aboutDocuments_eclink, aboutDocuments_fmlink, 
                    aboutDocuments_tblink, aboutDocuments_tdlink,aboutDocuments_edlink ,aboutDocuments_ddlink,
                    aboutDocuments_aplink
                  }
                }
              } = data;
              
        setState({
          banner_text: Banner_text,
          bannerimage_credit: BannerImageCredit,
          bannerimagecredit_more: BannerImageCredit_more,
          aboutTimeline_1: aboutTimeline_1,
          aboutTimeline_2: aboutTimeline_2,
          aboutTimeline_3: aboutTimeline_3,
          aboutTimeline_4: aboutTimeline_4,
          aboutTimeline_5: aboutTimeline_5,
          aboutDocuments_cblink: aboutDocuments_cblink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_cblink.data.attributes.url : undefined,
          aboutDocuments_aplink: aboutDocuments_aplink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_aplink.data.attributes.url : undefined,
          aboutDocuments_frlink: aboutDocuments_frlink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_frlink.data.attributes.url : undefined,
          aboutDocuments_eclink: aboutDocuments_eclink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_eclink.data.attributes.url : undefined,
          aboutDocuments_fmlink: aboutDocuments_fmlink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_fmlink.data.attributes.url : undefined,
          aboutDocuments_tblink: aboutDocuments_tblink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_tblink.data.attributes.url : undefined,
          aboutDocuments_tdlink: aboutDocuments_tdlink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_tdlink.data.attributes.url : undefined,
          aboutDocuments_edlink: aboutDocuments_edlink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_edlink.data.attributes.url : undefined,
          aboutDocuments_ddlink: aboutDocuments_ddlink.data.length !== 0 ? fetchBaseUrl + aboutDocuments_ddlink.data.attributes.url : undefined,
        });
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  return (
    <div className="about">

      {/**BANNER */}
      <div className="aboutBanner">
        <img src={button} className="aboutBanner_button" alt="_" />
        <div className="aboutBanner_card">
          <p>
            {state.banner_text}
          </p>
        </div>
        <div className="aboutBanner_credit" title={state.bannerimagecredit_more}><p>PHOTO BY {state.bannerimage_credit}</p></div>
        <img src={barbarajordan} className="aboutBanner_chick" alt="barbara-jordan" />
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
        <img src={tl} className="aboutTimeline_tl" alt="_" />
      </div>

      {/**DOCUMENTS */}
      <div className="aboutHead"><h1>PROJECT GUIDING PRINCIPLES</h1></div>
      <div className="aboutDocuments">
      {state.aboutDocuments_fmlink &&
          <Link to={`PDFViewer/${state.aboutDocuments_fmlink.split('/')[4]}`}>
            <div>
            FEMINIST DH MANIFESTA
            </div>
          </Link>
        }
        {state.aboutDocuments_eclink &&
          <Link to={`PDFViewer/${state.aboutDocuments_eclink.split('/')[4]}`}>
            <div>
              ETHICS OF CARE
            </div>
          </Link>
        }
         {state.aboutDocuments_cblink &&
          <Link to={`PDFViewer/${state.aboutDocuments_cblink.split('/')[4]}`}>

            <div>
              CODEBOOK
            </div>
          </Link>
        }
        {state.aboutDocuments_tdlink &&
          <Link to={`PDFViewer/${state.aboutDocuments_tdlink.split('/')[4]}`}>
            <div>
              TERMINOLOGY DOCUMENT
            </div>
          </Link>
        }
        {state.aboutDocuments_tblink &&
          <Link to={`PDFViewer/${state.aboutDocuments_tblink.split('/')[4]}`}>
            <div>
              TECHNOLOGY BACKGROUND
            </div>
          </Link>
        }
        {state.aboutDocuments_ddlink &&
          <Link to={`PDFViewer/${state.aboutDocuments_ddlink.split('/')[4]}`}>
            <div>
              DESIGN DOCUMENT
            </div>
          </Link>
        }
        {state.aboutDocuments_edlink &&
          <Link to={`PDFViewer/${state.aboutDocuments_edlink.split('/')[4]}`}>
            <div>
              EDITING PROCEDURES
            </div>
          </Link>
        }
        {state.aboutDocuments_frlink &&
          <Link to={`PDFViewer/${state.aboutDocuments_frlink.split('/')[4]}`}>
            <div>
              FURTHER READING
            </div>
          </Link>
        }
      </div>

      {/**MEET */}
      <MeetTheTeam />

    </div>
  )
}

export default About
