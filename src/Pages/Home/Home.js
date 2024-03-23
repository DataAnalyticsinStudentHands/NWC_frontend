import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Map from './Map';
import './OverlayVid.css';

import opening from './res/City of Houston Map.png';

import dt from './res/dt.png';
import tw from './res/tw.png';
import museo from './res/museo.png';
import mag from './res/mag.png';
import astro from './res/astro.png';

import toform from './res/toform.png';
import aboutpeople from './res/aboutpeople.png';
import minorityrightsplank from './res/minority_rights_plank.png';
import button1 from '../../assets/res/button-why-the-nwc-matters.png';
import button2 from '../../assets/res/button-discover.png';
import button3 from '../../assets/res/button-research-the-nwc.png';
import button4 from '../../assets/res/button-how-to-contribute.png';
import dots1 from './res/dots1.png';
import dots2 from './res/dots2.png';
import dots3 from './res/dots3.png';
import dots4 from './res/dots4.png';
import Carousel3 from '../../Components/Carousel/Carousel3';

import { useGlobalContext } from '../../context/GlobalProvider';
import ReactMarkdown from 'react-markdown'

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

  const overlaymp4 = process.env.REACT_APP_API_URL + "/uploads/overlayvid_compressed_381cfa05b6.mp4";

  const [homeAboutReadmore, setHomeAboutReadmore] = useState(false);
  const [homeDowntown, setHomeDowntown] = useState([]);
  const [homeThirdward_uh, setHomeThirdward_uh] = useState([]);
  const [homeMuseum_district, setHomeMuseum_district] = useState([]);
  const [homeMagnolia_park, setHomeMagnolia_park] = useState([]);
  const [homeAstrodome, setHomeAtrodome] = useState([]);
  const [openingMap, setOpeningMap] = useState(true);
  
  const [state, setState] = useState({

    photoByExplore: "",
    photoByExplore_more:  "",
    aboutImgCredit: "",
    aboutImgCredit_more: "",
    createdAt:"",
    homeAbout_p: "",
    homeAbout_p1: "",
    homeAbout_p2: "",
    homeButton1_link: "",
    homeButton1_text: "",
    homeButton2_link: "",
    homeButton2_text: "",
    homeButton3_link: "",
    homeButton3_text: "",
    homeButton4_link: "",
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

        const {data:
                {attributes:
                  {PhotoByExplore, PhotoByExplore_more, aboutImgCredit, aboutImgCredit_more, createdAt, homeAbout_p, homeAbout_p1, homeAbout_p2, homeButton1_link, homeButton1_text,
                    homeButton2_link, homeButton2_text, homeButton3_link, homeButton3_text, homeButton4_link, homeButton4_text, homeExplore_text, homeHighlights_content2, homeMap_text
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
          homeButton1_link: homeButton1_link,
          homeButton1_text: homeButton1_text,
          homeButton2_link: homeButton2_link,
          homeButton2_text: homeButton2_text,
          homeButton3_link: homeButton3_link,
          homeButton3_text: homeButton3_text,
          homeButton4_link: homeButton4_link,
          homeButton4_text: homeButton4_text,
          homeExplore_text: homeExplore_text,
          homeHighlights_content2: homeHighlights_content2,
          homeMap_text: homeMap_text
        })
        
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

  const [currMap, setCurrMap] = useState('dt');

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
          onClick={() => {
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
          {/**SPLASH */}
          <div className="homeSplash">
            <div className="homeSplash_toForm">
              <img src={toform} alt="conference_logo" />
            </div>

            <div className="homeSplash_card">
              <h3>Sharing Stories from 1977</h3>
              <div className="homeSplash_cardHr"></div>
              <p>PUTTING THE NATIONAL WOMEN&apos;S CONFERENCE ON THE MAP</p>
            </div>
          </div>

          {/**ABOUT */}
          <div className="homeAbout">
            <div className="homeAbout_beigeBackdrop"></div>
            <div className="homeAbout_content">
              <div className="homeAbout_card">
                <div className="homeAbout_headerBackdrop"></div>
                <p className="homeAbout_header">ABOUT THE PROJECT</p>
                <div className="homeAbout_cardHr"></div>

                {/*<p className="homeAbout_p1"><ReactMarkdown>{homeAbout_p}</ReactMarkdown></p>*/}
                <div className="homeAbout_peas">
                  <p className="homeAbout_p1"><ReactMarkdown>{state.homeAbout_p1}</ReactMarkdown></p>
                  {homeAboutReadmore ? (
                    <p className="homeAbout_p2"><ReactMarkdown>{state.homeAbout_p2}</ReactMarkdown></p>
                  ) : (
                    ''
                  )}
                </div>
                <p
                  className="homeAbout_readmore"
                  onClick={() => setHomeAboutReadmore(!homeAboutReadmore)}
                >
                  READ {homeAboutReadmore ? 'LESS' : 'MORE'}
                </p>
              </div>

              <div className="homeAbout_chicks">
                <img src={aboutpeople} alt="female_athletes" />
                <div title={state.aboutImgCredit_more} className="homeAbout_imgCred">
                  <p title={state.aboutImgCredit_more}>
                    {/* PHOTO BY {state.homeAboutImgCredit} */}
                    PHOTO BY {state.aboutImgCredit}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="homeAbout_border"></div>

          {/**MAP */}

          <div className="homeMap">
            <div className="homeMap_card">
              <div className="homeMap_headerBackdrop"></div>
              <p className="homeMap_header">INTERACTIVE MAP</p>
              <div className="homeMap_cardHr"></div>
              <p className="homeMap_text"><ReactMarkdown>{state.homeMap_text}</ReactMarkdown></p>
            </div>

            {openingMap ? (
              <>
                <div className="homeMap_tabs">
                  <div
                    className={openingMap ? 'homeMap_tab--active' : ''}
                    onClick={() => setOpeningMap(true)}
                  >
                    <p>HOUSTON 1977</p>
                  </div>
                  {Object.keys(maps).map((m) => (
                    <div
                      key={Math.random()}
                      className={
                        (currMap === m) & !openingMap
                          ? 'homeMap_tab--active'
                          : ''
                      }
                      onClick={() => {
                        setCurrMap(m);
                        setOpeningMap(false);
                      }}
                    >
                      <p>{maps[m].name}</p>
                    </div>
                  ))}
                </div>
                <div className="homeMap_tabsHr"></div>

                {[
                  { color: '#3FA490', x: '930', y: '754', mapName: 'dt' },
                  { color: '#615FBF', x: '960', y: '852', mapName: 'tw' },
                  { color: '#9EC7E1', x: '890', y: '849', mapName: 'museo' },
                  { color: '#142F45', x: '1070', y: '810', mapName: 'mag' },
                  { color: '#FFD048', x: '795', y: '964', mapName: 'astro' },

                ].map((p) => (
                  <div 
                    key={Math.random()}
                    style={{
                      position: 'absolute',
                      width: 'calc(35*var(--xUnit))',
                      height: 'calc(35*var(--xUnit))',
                      backgroundColor: p.color,
                      borderRadius: '999px',
                      marginLeft: `calc(${p.x}*var(--xUnit))`,
                      marginTop: `calc(${p.y}*var(--xUnit))`,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setCurrMap(p.mapName);
                      setOpeningMap(false);
                    }}
                  ></div>
                ))}
                <img
                  className="homeMap_opening"
                  src={opening}
                  alt="Opening Map"
                />
              </>
            ) : (
              <>
                <div className="homeMap_tabs">
                  <div
                    className={openingMap ? 'homeMap_tab--active' : ''}
                    onClick={() => setOpeningMap(true)}
                  >
                    <p>HOUSTON</p>
                  </div>
                  {Object.keys(maps).map((m) => (
                    <div
                      key={Math.random()}
                      className={
                        (currMap === m) & !openingMap
                          ? 'homeMap_tab--active'
                          : ''
                      }
                      onClick={() => {
                        setCurrMap(m);
                        setOpeningMap(false);
                      }}
                    >
                      <p>{maps[m].name}</p>
                    </div>
                  ))}
                </div>
                <div className="homeMap_tabsHr"></div>

                <Map
                  mapImg={maps[currMap].mapImg}
                  points={maps[currMap].points}
                />
              </>
            )}
          </div>

          {/**EXPLORE */}
          <div className="homeExplore">
            <div className="homeExplore_card">
              <div className="homeExplore_headerBackdrop"></div>
              <p className="homeExplore_header">EXPLORE THE SITE</p>
              <div className="homeExplore_hr"></div>
              <p className="homeExplore_text"><ReactMarkdown>{state.homeExplore_text}</ReactMarkdown></p>
            </div>

            <div className="homeExplore_img">
              <img src={minorityrightsplank} alt="minority_rights_plank" />
            </div>
            <div className="homeExplore_imgSrc" title={state.photoByExplore_more}>
              <p>PHOTO BY {state.photoByExplore}</p>
            </div>

            <div className="homeExplore_borderBot"></div>
          </div>

          {/**BUTTONS */}
          <div className="homeButtons">
            <Link to={state.homeButton1_link}>
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
            </Link>

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
      <div className="homeLaunch">
        <h1>SITE HIGHLIGHTS</h1>
      <div className='homeLaunchPanel'>
        <Carousel3 images={images}/>
      </div>
    </div>
  </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Home;
