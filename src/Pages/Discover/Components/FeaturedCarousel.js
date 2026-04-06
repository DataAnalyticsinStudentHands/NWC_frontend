import Slider from 'react-slick';
import LeftButtonIcon from '../../../Pages/ResearchingNWC/res/Left Button.svg';
import RightButtonIcon from '../../../Pages/ResearchingNWC/res/Right Button.svg';
import DiscoverCard from './DiscoverCard';

const FeaturedCarousel = ({ cards }) => {
  function NextArrow({ className, style, onClick }) {
    return (
      <img
        className={className}
        src={RightButtonIcon}
        alt="Next"
        style={{ ...style, display: "flex", width: 'var(--arrow-size)', height: 'var(--arrow-size)', marginRight: '-50rem' }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow({ className, style, onClick }) {
    return (
      <img
        className={className}
        src={LeftButtonIcon}
        alt="Previous"
        style={{ ...style, display: "flex", zIndex: '1', width: 'var(--arrow-size)', height: 'var(--arrow-size)', marginLeft: '-50rem' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Slider {...settings}>
      {cards.map((value) => (
        <DiscoverCard
          key={value.id}
          color={["yellow", "blue", "red", "teal"][value.firstname.charCodeAt(0) % 4]}
          href={`/Discover/${value.id}`}
          firstname={value.firstname}
          lastname={value.lastname}
          role={value.role}
          state={value.state}
          profilepic={value.profilepic}
        />
      ))}
    </Slider>
  );
};

export default FeaturedCarousel;
