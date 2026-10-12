import minorityrightsplank from '../res/minority_rights_plank.png'
import ReactMarkdown from 'react-markdown'; 
import PropTypes from "prop-types";

import './HomeExplore.css'

export const HomeExplore = ( { homeExplore_text, photoBy, title }) => {
    return (
        <div className="homeExplore">
            <div className="homeExplore_card">
            <div className="homeExplore_headerBackdrop"></div>
            <p className="homeExplore_header">EXPLORE THE SITE</p>
            <div className="homeExplore_hr"></div>
            <p className="homeExplore_text"><ReactMarkdown>{homeExplore_text}</ReactMarkdown></p>
            </div>

            <div className="homeExplore_img">
            <img src={minorityrightsplank} alt="minority_rights_plank" />
            </div>
            <div className="homeExplore_imgSrc" title={title}>
            <p>PHOTO BY {photoBy}</p>
            </div>

            <div className="homeExplore_borderBot"></div>
      </div>
    )
};

HomeExplore.propTypes = {
    homeExplore_text: PropTypes.string,
    photoBy: PropTypes.string,
	opentitleing: PropTypes.string,
};