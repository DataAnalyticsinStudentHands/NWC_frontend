import './Carousel3.scss';
import getData from './setItems.js'
import Slider from 'react-slick';

const Carousel3 = (props) => {

  let data = getData(props)
  
  function NextArrow(props){
      const { className, style, onClick } = props;
      return (
          <div
          className={className}
          style={{ ...style, display: "block", background: "red", "borderRadius":"50%" }}
          onClick={onClick}
          />
      );
  }
  function PrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red", zIndex:'1', "borderRadius":"50%"}}
          onClick={onClick}
        />
      );
    }
  const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      
      // pauseOnHover: true,
      // lazyLoad: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
  };
return (
  
      <Slider {...settings}>
        {data}
      </Slider>
  

  )
};
export default Carousel3;