import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; 
import aboutpeople from '../res/aboutpeople.png';
import PropTypes from 'prop-types';

import './HomeAbout.css'

export const HomeAbout = ( { p1, p2, ImgCredit_more, ImgCredit }) => {

  const [homeAboutReadmore, setHomeAboutReadmore] = useState(false);

    return (
    <div className="homeAbout">
        <div className="homeAbout_beigeBackdrop"></div>
        <div className="homeAbout_content">
        <div className="homeAbout_card">
            <div className="homeAbout_headerBackdrop"></div>
            <div className="homeAbout_header">
            <p className="homeAbout_header">ABOUT THE PROJECT</p>
            </div>
            <div className="homeAbout_cardHr"></div>

            <div className="homeAbout_peas">
            <div className="homeAbout_p1">
                <ReactMarkdown>{p1}</ReactMarkdown>
            </div>
            {homeAboutReadmore ? (
                <div className="homeAbout_p2">
                    <ReactMarkdown>{p2}</ReactMarkdown>
                </div>
            ) : (
                ''
            )}
            </div>
            <p
            className="homeAbout_readmore"
            onClick={(e) => setHomeAboutReadmore(!homeAboutReadmore)}
            >
            READ {homeAboutReadmore ? 'LESS' : 'MORE'}
            </p>
        </div>

        <div className="homeAbout_chicks">
            <img src={aboutpeople} alt="female_athletes" />
            <div title={ImgCredit_more} className="homeAbout_imgCred">
            <p title={ImgCredit_more}>
                PHOTO BY {ImgCredit}
            </p>
            </div>
        </div>
        </div>
        <div className="homeAbout_border"></div>
    </div>
    
  );
};

HomeAbout.propTypes = {
    p1: PropTypes.string,
    p2: PropTypes.string,
	ImgCredit: PropTypes.string,
    ImgCredit_more: PropTypes.string
};