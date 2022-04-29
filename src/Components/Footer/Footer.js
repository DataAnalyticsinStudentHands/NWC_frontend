import React, { useState, useEffect } from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';

import VARIABLES from "../../config/.env";

import icon from "./res/icon.png";
import instagram from "./res/instagram.png";
import twitter from "./res/twitter.png";
import facebook from "./res/facebook.png";
import natendow from "./res/natendow.png";

function Footer() {

    const [state, setState] = useState({
        donateLink: '',
        facebookLink: '',
        instagramLink: '',
        twitterLink: '',
        contactEmail: '',
        paragraph: '',

    });

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "content-footer"].join('/'))
        .then(response => response.json())
        .then(data => {

            setState({
                donateLink: data.DonateLink,
                facebookLink: data.FacebookLink,
                instagramLink: data.InstagramLink,
                twitterLink: data.TwitterLink,
                contactEmail: data.contactEmail,
                paragraph: data.paragraph
            });

          })
        }, []);  /* eslint-disable-line */

    return (
        <div className="footer">
                <div className="footer_top icon">
                    <div className="footer_top icon centered">
                    <img src={icon} alt="project_icon"/>
                    <p style={{marginTop: "20rem"}}>Designer of IWY Symbol: Valerie Pettis</p>
                    </div>
                    
                </div>
                <div className="footer_top home">
                    <Link to={'/'}>HOME</Link>
                </div>
                <div className="footer_top contact">
                    <a href={`mailto:${state.contactEmail}`}><p>CONTACT</p></a>
                </div>
                <div className="footer_top donate">
                    <a href={state.donateLink} target="_blank" rel="noopener noreferrer">DONATE</a>
                </div>
                <div className="footer_top social">
                    <div className="socialMedia">
                        <p>SOCIAL MEDIA</p>
                    </div>
                    <div className="instagram">
                        <a href={state.instagramLink}><img src={instagram} alt="instagram_logo"/></a>
                    </div>
                    <div className="twitter">
                        <a href={state.twitterLink}><img src={twitter} alt="twitter_logo"/></a>
                    </div>
                    <div className="facebook">
                        <a href={state.facebookLink}><img src={facebook} alt="facebook_logo"/></a>
                    </div>
                </div>
            <div className="footer_bot">
                <div className="footer_support">
                    The Sharing Stories from 1977 project appreciates the support of the following:
                </div>
                <div className="footer_seal">
                    <img src={natendow} alt="NEH_seal"/> 
                </div>
                {state.paragraph}
            </div>
        </div>
    )
}

export default Footer
