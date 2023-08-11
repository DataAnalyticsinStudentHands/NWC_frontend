import React from 'react';
// import PropTypes from 'prop-types';

export const Banner = ({imgLeft, text, imgRight, imgCredit}) => {
    return(
    <div className='Banner'>

        <div className='Banner_left'>
            <img src={imgLeft} alt="How to Contribute" />
        </div>

        <div className='Banner_center'>
            <div className='topright' />
            <div className='text'>
                {text}
            </div>
            <div className='bottomleft' />
        </div>

        <div className='Banner_right'>
            <img src={imgRight} alt="How to Contribute" />
            <p>Photo by {imgCredit}</p>
        </div>

    </div>
    )
}