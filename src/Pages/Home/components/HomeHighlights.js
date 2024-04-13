import PropTypes from 'prop-types';
import './HomeHighlights.css'
import Carousel3 from '../../../Components/Carousel/Carousel3';

export const HomeHighlights = ( { images }) => {
    return (
    <div className="homeLaunch">
        <h1>SITE HIGHLIGHTS</h1>
        {/* <h1>SITE HIGHLIGHTS</h1> */}
        <div className='homeLaunchPanel'>
            <Carousel3 images={images}/>
        </div>
    </div>
    )
};

HomeHighlights.propTypes = {
    images: PropTypes.object,
};