import React, { useState, Children, useEffect } from 'react';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
// import './Carousel3.scss';
import getData from './setItems.js'
import { Link } from 'react-router-dom';
import inperson from '../../Pages/Home/res/inperson.png';
import online from '../../Pages/Home/res/online.png';
import share from '../../Pages/Home/res/share.png';

import comingsoon from "../../Pages/Why/res/comingsoon_thumb.png";

import Slider from 'react-slick';

const Carousel3 = (props) => {
  // let data = [ <a href="https://www.eventbrite.com/e/why-the-1977-national-womens-conference-matters-tickets-269032983897"
  // target="_blank" rel="noopener noreferrer"><img src={inperson} alt="inperson"/></a>,
  // <a href="https://www.eventbrite.com/e/269039112227"
  // target="_blank" rel="noopener noreferrer"><img src={online} alt="online"/></a>,
  // <a href="https://www.eventbrite.com/e/269045882477"
  // target="_blank" rel="noopener noreferrer"><img src={share} alt="share"/></a>]
  let data = getData(props)
  function NextArrow(props){
      const { className, style, onClick } = props;
      return (
          <div
          className={className}
          style={{ ...style, display: "block", background: "" }}
          onClick={onClick}
          />
      );
  }
  function PrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "", zIndex:'1'}}
          onClick={onClick}
        />
      );
    }
  const Slicksettings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      // centerMode: true,
      pauseOnHover: true,
      lazyLoad: true,
      // nextArrow: <NextArrow />,
      // prevArrow: <PrevArrow />
  };
return (
  
      <Slider {...Slicksettings}>
        {data}
      </Slider>
  

  )
};
export default Carousel3;
// function Carousel3(props){
//   let item = props.images
//   console.log('line 10', item)
//   let items = []
//   let nameOfClass = ''
//   if(item[0][0]==='essay'){
//     nameOfClass = 'whyEssays_list'
//   }
//   if(item[0][0]==='default'){
//     nameOfClass = 'whyEssays_list'
//   }

//   for(let x in item){
//    item[x][0]==='essay' && item[x][4]===true?
//     items.push(
//     <div key={item[x][1]} className='thumb_with_title'>
//         <Link to={`item?id=${item[x][1]}`}>
//             <img src={item[x][2]} alt="" key={item[x][1]} />
//             <h3 className="thumb_with_title_h3">{item[x][3]}</h3>
//         </Link>
//     </div>):
//     item[x][0]==='essay' && item[x][4]===false?
//     items.push(
//     <div key={item[x][1]} className='thumb_with_title'>
//         <img src={comingsoon} alt="" key={comingsoon} />
//         <h3 className="thumb_with_title_h3">Coming Soon</h3>
//     </div>):
//     item[x][0]==='default'?
//     items.push(
//       <a href={item[x][1]}
//         target="_blank" rel="noopener noreferrer"><img src={item[x][2]} alt=""/>
//       </a>
//     ):
//     items.push(
//       <h1>No Images Found</h1>
//     )
//   }
//   return (
//     <div className={nameOfClass}>
//     <Carousel
//       className='carousel3'
//       slides={items}
//       plugins={[
//       'centered',
//       'infinite',
//       'arrows',
//       {
//         resolve: slidesToShowPlugin,
//         options: {
//         numberOfSlides: 2,

//         },
//       },
//     ]}   
//   />
//  <Dots 
//     number={items.length}
//  />
//   </div>
//   )
  
// }

// export default Carousel3