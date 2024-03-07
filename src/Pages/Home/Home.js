import React, { useState, useEffect } from 'react';
import './Home.css';
import './OverlayVid.css';

import opening from './res/City of Houston Map.png';

import dt from './res/dt.png';
import tw from './res/tw.png';
import museo from './res/museo.png';
import mag from './res/mag.png';
import astro from './res/astro.png';

import button1 from '../../assets/res/button-why-the-nwc-matters.png';
import button2 from '../../assets/res/button-discover.png';
import button3 from '../../assets/res/button-research-the-nwc.png';
import button4 from '../../assets/res/button-how-to-contribute.png';
import dots1 from './res/dots1.png';
import dots2 from './res/dots2.png';
import dots3 from './res/dots3.png';
import dots4 from './res/dots4.png';
import { Stack } from '../../Components/Stack';

import { useGlobalContext } from '../../context/GlobalProvider';
import { PinButtons } from '../../Components/PinButtons/PinButtons'
import { HomeBanner } from './components/HomeBanner'
import { HomeAbout } from './components/HomeAbout'
import { HomeMap } from './components/HomeMap'
import { HomeExplore } from './components/HomeExplore'
import { HomeHighlights } from './components/HomeHighlights'

const getWhere = (data, key, value) => {
  return data.filter((e) => e.attributes[key] === value);
};

const urlify = (str) => {
  return `${process.env.REACT_APP_API_URL}${str}`; 
};

// sort points of interest by first element (Name)
const superSorter = (list) => {
  let cpy = [...list];
  cpy = cpy.sort(function(a, b) { 
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
      return 0;
  });
  return cpy;
};

function Home() {
  const [globalState, globalDispatch] = useGlobalContext();

  const overlaymp4 = process.env.REACT_APP_OVERLAYMP4; 

  const [homeDowntown, setHomeDowntown] = useState([]);
  const [homeThirdward_uh, setHomeThirdward_uh] = useState([]);
  const [homeMuseum_district, setHomeMuseum_district] = useState([]);
  const [homeMagnolia_park, setHomeMagnolia_park] = useState([]);
  const [homeAstrodome, setHomeAtrodome] = useState([]);
  const buttons = [button1, button2, button3, button4];
  const [state, setState] = useState({
    photoByExplore: "",
    photoByExplore_more:  "",
    aboutImgCredit: "",
    aboutImgCredit_more: "",
    createdAt:"",
    homeAbout_p: "",
    homeAbout_p1: "",
    homeAbout_p2: "",
    homeButtons: [
      { link: "", text: "" },  // homeButton1
      { link: "", text: "" },  // homeButton2
      { link: "", text: "" },  // homeButton3
      { link: "", text: "" },  // homeButton4
    ],
    homeExplore_text: "",
    homeHighlights_content2: "",
    homeMap_text: ""
  });

  const scroll = () => {
    window.scrollTo(0, 0);
    return <></>;
  };

  useEffect(() => {
    fetch([process.env.REACT_APP_API_URL, 'api/content-home'].join('/'))
      .then((res) => res.json())
      .then((data) => {
  
        const {
          data: {
            attributes: {
              PhotoByExplore, PhotoByExplore_more, aboutImgCredit, aboutImgCredit_more, createdAt, homeAbout_p, homeAbout_p1, homeAbout_p2,
              homeButton1_link, homeButton1_text, homeButton2_link, homeButton2_text, homeButton3_link, homeButton3_text, homeButton4_link, homeButton4_text,
              homeExplore_text, homeHighlights_content2, homeMap_text
            }
          }
        } = data;
  
        setState({
          photoByExplore: PhotoByExplore,
          photoByExplore_more: PhotoByExplore_more,
          aboutImgCredit: aboutImgCredit,
          aboutImgCredit_more: aboutImgCredit_more,
          createdAt: createdAt,
          homeAbout_p: homeAbout_p,
          homeAbout_p1: homeAbout_p1,
          homeAbout_p2: homeAbout_p2,
          homeButtons: [
            { link: homeButton1_link, text: homeButton1_text },
            { link: homeButton2_link, text: homeButton2_text },
            { link: homeButton3_link, text: homeButton3_text },
            { link: homeButton4_link, text: homeButton4_text },
          ],
          homeExplore_text: homeExplore_text,
          homeHighlights_content2: homeHighlights_content2,
          homeMap_text: homeMap_text
        });
  
      })
      .catch((err) => console.log(err));
  }, []);

  const[images, setImages] = useState([[]])

  useEffect(() => {
    fetch([process.env.REACT_APP_API_URL, 'api/content-home-maps?populate=*'].join('/'))
      .then((res) => res.json())
      .then((data) => {
        
        const get = (map) => {
          return superSorter(
            getWhere(data.data, 'Map', map).map((p) => {
              const 
                  {attributes:
                    {x, y, Name, Description, citation1, citation2, citation3, 
                      mainImage, pdf1, pdf2, pdf3, img1, img2, img3, sources}} = p;
              const p2 = [];
              
              p2[0] = Name;
              p2[1] = x;
              p2[2] = y;
              p2[3] = Description;
              p2[4] = mainImage.data.attributes.url ? urlify(mainImage.data.attributes.url) : undefined;
              p2[5] = pdf1.data.attributes.url ? urlify(pdf1.data.attributes.url) : undefined;
              p2[6] = pdf2.data.attributes.url ? urlify(pdf2.data.attributes.url) : undefined;
              p2[7] = pdf3.data.attributes.url ? urlify(pdf3.data.attributes.url) : undefined;
              //p2[8] = p.pdf4[0] ? urlify(p.pdf4[0].url) : undefined;
              p2[9] = img1.data.attributes.url ? urlify(img1.data.attributes.url) : undefined;
              p2[10] = img2.data.attributes.url ? urlify(img2.data.attributes.url) : undefined;
              p2[11] = img3.data.attributes.url ? urlify(img3.data.attributes.url) : undefined;
              //p2[12] = p.img4[0] ? urlify(p.img4[0].url) : undefined;
              /*p2[4] = [
              p2[9], p2[10], p2[11], p2[12]
            ]*/
              //p2[4] = p2[4][Math.floor(Math.random()*p2[4].length)];
              //console.log(p);
              p2[13] = citation1 ? citation1: '';
              //console.log(p);
              p2[14] = citation2 !== undefined ? citation2 : '';
              p2[15] = citation3 !== undefined ? citation3 : '';
              p2[16] = sources
              //p2[16] = p.citation4 !== undefined ? p.citation4 : "";
              return p2;
            })
          );
        };
        
        setHomeDowntown(get('downtown'));
        setHomeThirdward_uh(get('thirdward_uh'));
        setHomeMuseum_district(get('museum_district'));
        setHomeMagnolia_park(get('magnolia_park'));
        setHomeAtrodome(get('astrodome'));
      });
  }, []);

  const maps = {
    dt: {
      name: 'DOWNTOWN',
      mapImg: dt,
      points: homeDowntown,
    },
    tw: {
      name: 'THIRD WARD/UH',
      mapImg: tw,
      points: homeThirdward_uh,
    },
    museo: {
      name: 'MUSEUM DISTRICT',
      mapImg: museo,
      points: homeMuseum_district,
    },
    mag: {
      name: 'MAGNOLIA PARK',
      mapImg: mag,
      points: homeMagnolia_park,
    },
    astro: {
      name: 'ASTRODOME',
      mapImg: astro,
      points: homeAstrodome,
    },
  };

  useEffect(() => {
    fetch([process.env.REACT_APP_API_URL, "api/home-highlights?populate=*"].join('/'))
    .then(res => res.json())
    .then(data => {
      
        setImages(
            data.data.map(d => {
                const featured = d.attributes.Featured;
                const thumbnail = [process.env.REACT_APP_API_URL, d.attributes.Thumbnail.data.attributes.url].join('')
                const id = d.id;
                const title = d.attributes.ShortTitle;
                const link = d.attributes.home_highlights_link

                return ['default', id, thumbnail, title, featured, link];
            })
        )
    })
    .catch(err => console.log(err));
}, []); 


  return (
    <>
      <div
        className={
          'overlay_vid ' + (globalState.video ? '' : 'overlay_vid--off')
        }
      >
        <p
          className="overlay_vid_skip"
          onClick={(e) => {
            globalDispatch('VIDEO_OFF');
            scroll();
          }}
        >
          Skip Video
        </p>
        <video autoPlay controls muted playsInline>
          <source
            src={overlaymp4}
            type="video/mp4;codecs=avc1.42E01E, mp4a.40.2"
          ></source>
        </video>
        {/*<a href='#'>
        <div className="overlay_vid_continue" onClick={e => setVideoOn(!videoOn)}>
          Continue To Site -&gt;
        </div>
  </a>*/}

        {/*<div className="overlay_vid_card">
        <h3>Sharing Stories from</h3>
        <div className="overlay_vid_cardhr"></div>
        <p>PUTTING THE NATIONAL WOMEN'S CONFERENCE ON THE MAP</p>
        <a href='#'>
          <div className="overlay_vid_cardbut" onClick={e => {setVideoOn(!videoOn); scroll()}}>Enter Site</div>
        </a>
      </div>*/}
      </div>

      {!globalState.video ? (
        
        <div className="home">
          <button className="scroll-to-top" onClick={scroll}>
            <div className="arrow-up"></div>
          </button>
          {/**Home Banner */}
          <HomeBanner />

          {/**ABOUT */}
          <HomeAbout p1={state.homeAbout_p1} p2={state.homeAbout_p2} ImgCredit_more={state.aboutImgCredit_more} ImgCredit={state.aboutImgCredit}/>

          {/**MAP */}
          <HomeMap homeMap_text={state.homeMap_text} maps={maps} opening={opening} />

          <HomeExplore homeExplore_text={state.homeExplore_text} photoBy={state.photoByExplore} title={state.photoByExplore_more} />
          {/**EXPLORE */}
                      
          {/**PIN BUTTONS */}
          <div className="homeButtons">
            <Stack wrap margin="8% 0%">
              {state.homeButtons.map((button, index) => (
                <PinButtons
                  key={index}
                  button={buttons[index]} 
                  link={button.link}
                  text={button.text}
                />
              ))}
            </Stack>
            {/* <Link to={state.homeButton1_link}>
              <div className="homeButtons_button homeButtons_button1">
                <img src={button1} alt="button_2" />
                <p>{state.homeButton1_text}</p>
              </div>
            </Link>
            <Link to={state.homeButton2_link}>
              <div className="homeButtons_button homeButtons_button2">
                <img src={button2} alt="button_2" />
                <p>{state.homeButton2_text}</p>
              </div>
            </Link>
            <Link to={state.homeButton3_link}>
              <div className="homeButtons_button homeButtons_button3">
                <img src={button3} alt="button_3" />
                <p>{state.homeButton3_text}</p>
              </div>
            </Link>
            <Link to={state.homeButton4_link}>
              <div className="homeButtons_button homeButtons_button4">
                <img src={button4} alt="button_4" />
                <p>{state.homeButton4_text}</p>
              </div>
            </Link> */}
            <img
              className="homeButtons_dots homeButtons_dots1"
              src={dots1}
              alt=""
            />
            <img
              className="homeButtons_dots homeButtons_dots2"
              src={dots2}
              alt=""
            />
            <img
              className="homeButtons_dots homeButtons_dots3"
              src={dots3}
              alt=""
            />
            <img
              className="homeButtons_dots homeButtons_dots4"
              src={dots4}
              alt=""
            /> 
          </div>

          {/**HIGHLIGHTS */}
          <HomeHighlights images={images}/>
  </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Home;
