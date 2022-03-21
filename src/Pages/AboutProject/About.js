import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./About.css";

import button from "./res/button.png";
import chick from './res/chick.png';
import tl from './res/tl.png';

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
    fetch(`${fetchBaseUrl}/content-about`)
      .then(res => res.json())
      .then(data => {
        setState({
          banner_text: data.Banner_text,
          bannerimage_credit: data.BannerImage_Credit,
          bannerimagecredit_more: data.BannerImageCredit_more,
          aboutTimeline_1: data.aboutTimeline_1,
          aboutTimeline_2: data.aboutTimeline_2,
          aboutTimeline_3: data.aboutTimeline_3,
          aboutTimeline_4: data.aboutTimeline_4,
          aboutTimeline_5: data.aboutTimeline_5,
          aboutDocuments_ddlink: data.aboutDocuments_ddlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_ddlink[0].url : undefined,
          aboutDocuments_cblink: data.aboutDocuments_cblink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_cblink[0].url : undefined,
          aboutDocuments_aplink: data.aboutDocuments_aplink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_aplink[0].url : undefined,
          aboutDocuments_frlink: data.aboutDocuments_frlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_frlink[0].url : undefined,
          aboutDocuments_eclink: data.aboutDocuments_eclink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_eclink[0].url : undefined,
          aboutDocuments_fmlink: data.aboutDocuments_fmlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_fmlink[0].url : undefined,
          aboutDocuments_tblink: data.aboutDocuments_tblink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_tblink[0].url : undefined,
          aboutDocuments_tdlink: data.aboutDocuments_tdlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_tdlink[0].url : undefined,
          aboutDocuments_edlink: data.aboutDocuments_edlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_edlink[0].url : undefined,
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
        <img src={chick} className="aboutBanner_chick" alt="_" />
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
