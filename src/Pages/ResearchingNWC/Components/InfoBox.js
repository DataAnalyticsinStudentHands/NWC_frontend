import { useState } from 'react';
import InfoIcon from '../res/InfoIcon.svg'
import ReactMarkdown from 'react-markdown'; 


export const InfoBox = (props) => {
    const [showInfo, setShowInfo] = useState(false);

    const handleInfoClick = () => {
    setShowInfo(!showInfo);
    };

    const handleCloseClick = () => {
    setShowInfo(false);
    };

    return (
    <div className="info-container">
        <img
        src={InfoIcon}
        alt="Info Icon"
        className="info-image"
        onClick={handleInfoClick}
        />
        {showInfo && (
        <div className="info-box">
            <span className="info-box-close" onClick={handleCloseClick}>
            &times;
            </span>
            <h3> {props.category} </h3>
            <ReactMarkdown>{typeof props.text === 'string' ? props.text : ''}</ReactMarkdown>
        </div>
        )}
    </div>
    );
};
