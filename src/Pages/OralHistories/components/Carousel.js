import Slider from 'react-slick';
import ReactPlayer from 'react-player'
import './Carousel.scss';
import LeftButtonIcon from '../../ResearchingNWC/res/Left Button.svg';
import RightButtonIcon from '../../ResearchingNWC/res/Right Button.svg';

const Carousel = (props) => {
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
        {props.videos
          .filter((video) => video[5] === 'true') // Filter videos with featured === true
          .map((video) => (
            <ReactPlayer url={video[7]} controls='true' width='100%' height='600rem' key={video} />
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;