import './Carousel3.scss';
import getData from './setItems.js';
import Slider from 'react-slick';
import LeftButtonIcon from '../../Pages/ResearchingNWC/res/Left Button.svg';
import RightButtonIcon from '../../Pages/ResearchingNWC/res/Right Button.svg';

const Carousel3 = (props) => {
  let data = getData(props);
  
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        src={RightButtonIcon}
        alt="Next"
        style={{
          ...style,
          display: "flex",
          width: 'var(--arrow-size)',
          height: 'var(--arrow-size)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        src={LeftButtonIcon}
        alt="Previous"
        style={{
          ...style,
          display: "flex",
          zIndex: '1',
          width: 'var(--arrow-size)',
          height: 'var(--arrow-size)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Slider {...settings}>
      {data}
    </Slider>
  );
};

export default Carousel3;
