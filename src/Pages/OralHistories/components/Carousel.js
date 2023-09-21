import Slider from 'react-slick';
import InfoVideo from '../../../Components/Avalon/InfoVideo';
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
    <div>
      <Slider {...settings}>
        {props.videos.map((src, index) => (
          <div key={index}>
            <InfoVideo src={src} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;