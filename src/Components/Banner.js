import React from 'react';
import PropTypes from 'prop-types';

export const Banner = ({imgLeft, text, imgRight, imgCredit, borderStyle}) => {

    const style = {
        [`border${borderStyle}`]: '0.75em solid #B32525',
    }

    return(
    <div className='Banner'>
        <div className='Banner_left'>
            <img src={imgLeft} alt="How to Contribute" />
        </div>

        <div className='Banner_center' style={ borderStyle === 'Corner' ? {padding:"4em 0em"}: {}}>
            <div className='Card' style={borderStyle !== 'Corner' ? style : {}}>
                {borderStyle === 'Corner' ? <div className='bottomleft' /> : null}
                <div className='text'>
                    {text}
                </div>
                {borderStyle === 'Corner' ? <div className='topright' /> : null }
            </div>
        </div>

        <div className='Banner_right'>
            <img src={imgRight} alt="How to Contribute" />
            <p>Photo by {imgCredit}</p>
        </div>
    </div>
    )
}

Banner.propTypes = {
    imgLeft: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imgRight: PropTypes.string.isRequired,
    imgCredit: PropTypes.string.isRequired,
    borderStyle: PropTypes.oneOf(["Corner", "Left", "Right"])
}
Banner.defaultProps = {
    imgLeft: "https://via.placeholder.com/150",
    text: "Banner",
    imgRight: "https://via.placeholder.com/250",
    imgCredit: "Shao",
    borderStyle: "Corner",
}