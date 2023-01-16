import React, { useState, Children } from 'react';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './Carousel3.scss';
import { Link } from 'react-router-dom';

import comingsoon from "../../Pages/Why/res/comingsoon_thumb.png";

function Carousel3(props){
  let essay = props.essays
  console.log('line 10', essay)
  let items = []
  for(let x in essay){
    
   essay[x][0]==='essay' && essay[x][4]===true?
    items.push(
    <div key={essay[x][1]} className='thumb_with_title'>
        <Link to={`essay?id=${essay[x][1]}`}>
            <img src={essay[x][2]} alt="" key={essay[x][1]} />
            <h3 className="thumb_with_title_h3">{essay[x][3]}</h3>
        </Link>
    </div>):
    essay[x][0]==='essay' && essay[x][4]===false?
    items.push(
    <div key={essay[x][1]} className='thumb_with_title'>
        <img src={comingsoon} alt="" key={comingsoon} />
        <h3 className="thumb_with_title_h3">Coming Soon</h3>
    </div>):
    essay[x][0]==='home'?
    items.push(
      <a href={essay[x][1]}
        target="_blank" rel="noopener noreferrer"><img src={essay[x][2]} alt=""/>
      </a>
    ):
    items.push(
      <h1>hello</h1>
    )
  }
  return (
    <Carousel
    className='carousel3'
    slides={items}
    plugins={[
    'centered',
    'infinite',
    'arrows',
    {
      resolve: slidesToShowPlugin,
      options: {
       numberOfSlides: 2,

      },
    },
  ]}   
>
  </Carousel>)
}

export default Carousel3