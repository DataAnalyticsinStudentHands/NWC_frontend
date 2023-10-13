import React from 'react';
import PropTypes from 'prop-types';
import imageLeftDemo from '../assets/res/button-research-the-nwc.png'
import imageRightDemo from '../Pages/ResearchingNWC/res/component119.png'
export const Banner = ({
    imgLeft, text, imgRight, imgCredit, borderStyle,
    flexLeft, flexMiddle,flexRight
}) => {

    const style = {
        [`border${borderStyle}`]: '0.75em solid #B32525',
    }

    return(
    <div className='Banner'>
        <div className='Banner_left' style={{flex:flexLeft}}>
            <img src={imgLeft} alt="How to Contribute" />
        </div>

        <div className='Banner_center' style={ borderStyle === 'Corner' ? {padding:"4em 0em", flex:flexMiddle}: {flex:flexMiddle}}>
            <div className='Card' style={borderStyle !== 'Corner' ? style : {}}>
                {borderStyle === 'Corner' ? <div className='bottomleft' /> : null}
                <div className='text'>
                    {text}
                </div>
                {borderStyle === 'Corner' ? <div className='topright' /> : null }
            </div>
        </div>

        <div className='Banner_right' style={{flex:flexRight}}>

            <img src={imgRight} alt="How to Contribute" />
            <div>

                <div>Photo by {imgCredit}</div>

            </div>
        </div>
    </div>
    )
}

Banner.propTypes = {
    imgLeft: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imgRight: PropTypes.string.isRequired,
    imgCredit: PropTypes.string.isRequired,
    borderStyle: PropTypes.oneOf(["Corner", "Left", "Right"]),
    flexLeft: PropTypes.number,
    flexMiddle: PropTypes.number,
    flexRight: PropTypes.number,
}
Banner.defaultProps = {
    imgLeft: imageLeftDemo,
    text: "Banner",
    imgRight: imageRightDemo,
    imgCredit: "STH",
    borderStyle: "Corner",
    flexLeft: 1,
    flexMiddle: 2,
    flexRight: 1,
}