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
          style={{ ...style, display: "flex", background: "#B32525", width:'calc(50*var(--xUnit))', height:'calc(50*var(--xUnit))', "borderRadius":"calc(10*var(--xUnit))", 'alignItems':'center', 'justifyContent':'center' }}
          onClick={onClick}
          />
      );
  }
  function PrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "flex", background: "#B32525", zIndex:'1', width:'calc(50*var(--xUnit))', height:'calc(50*var(--xUnit))', "borderRadius":"calc(10*var(--xUnit))", 'alignItems':'center', 'justifyContent':'center' }}
          onClick={onClick}
        />
      );
    }
  const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
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