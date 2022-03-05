import React, { useState, useEffect } from 'react'
import "./About.css";

import button from "./res/button.png";
import chick from './res/chick.png';
import tl from './res/tl.png';
import meet from './res/meatteem.png';
import bottomchart from './res/bottomchart.png';

import VARIABLES from "../../config/.env.js";

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
          aboutDocuments_frlink: data.aboutDocuments_frlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_frlink[0].url : undefined
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
        <div className="aboutTimeline_header"><p>PROJECT TIMELINE</p></div>
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
      <div className="aboutDocuments">
        {state.aboutDocuments_ddlink &&
          <a href={state.aboutDocuments_ddlink} target="_blank" rel="noreferrer" >
            <div>
              DESIGN DOCUMENTS
            </div>
          </a>
        }
        {state.aboutDocuments_cblink &&
          <a href={state.aboutDocuments_cblink} target="_blank" rel="noreferrer" >
            <div>
              CODEBOOK
            </div>
          </a>
        }
        {state.aboutDocuments_frlink &&
          <a href={state.aboutDocuments_frlink} target="_blank" rel="noreferrer" >
            <div>
              FURTHER READING
            </div>
          </a>
        }
      </div>

      {/**MEET */}
      <div className="aboutMeet">
        <img src={meet}/>
      </div>

      {/**BOTTOMCHART */}
      <div className="aboutChart">
        <img src={bottomchart}/>
      </div>

    </div>
  )
}

export default About
