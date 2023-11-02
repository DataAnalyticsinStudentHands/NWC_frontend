import Slider from 'react-slick';
import InfoVideo from '../../../Components/Avalon/InfoVideo'
import './Carousel.scss';
import LeftButtonIcon from '../../ResearchingNWC/res/Left Button.svg';
import RightButtonIcon from '../../ResearchingNWC/res/Right Button.svg';
import video_placeholder from "../res/video_placeholder.png"

const Carousel = (props) => {
  const updatedVideos = props.videos.map((item) => {
    const videoUrl = item[7];
  
    // Check if videoUrl is null or undefined, and handle it appropriately
    if (videoUrl != null) {
      // Check if videoUrl contains 'youtube', and if so, replace 'watch?v=' with 'embed/'
      if (videoUrl.includes('youtube')) {
        item[7] = videoUrl.replace('watch?v=', 'embed/');
      }
  
      // Check if the modified videoUrl contains an '&' and remove all characters after it
      if (item[7].includes('&')) {
        item[7] = item[7].split('&')[0];
      }
    }
    
    return item;
  });
  
  const NextArrow = (props) => {
    return (
      <div
        className={props.className}
        onClick={props.onClick}
        style={{
          ...props.style,
          cursor: 'pointer',
        }}
      >
        <img src={RightButtonIcon} alt="Next" />
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    return (
      <div
        className={props.className}
        onClick={props.onClick}
        style={{
          ...props.style,
          cursor: 'pointer',
        }}
      >
        <img src={LeftButtonIcon} alt="Previous" />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
      {updatedVideos.filter((video) => video[5] === 'true').length === 0 ? (
      <InfoVideo src={video_placeholder} />
      ) : (
        updatedVideos
        .filter((video) => video[5] === 'true') // Filter videos with featured === true
        .map((video) => (
          <InfoVideo src={video[2].includes("data:image") ? video[7] : video[2] || video_placeholder} key={video} />
    ))
)}
      </Slider>
    </div>
  );
};

export default Carousel;