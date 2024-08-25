import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Collapsible from '../ResearchingNWC/AdvancedSearch/Collapsible';

import './Map.css';
import maptick from './res/maptick.png';

// point format: [Name, x, y, Description]
function Map({mapImg, points}) {
  // one state to hold the regular page content loaded from Strapi
  const [state, setState] = useState({
    description: '',
    mainImage: '',
    pdf1: '',
    pdf2: '',
    pdf3: '',
    img1: '',
    img2: '',
    img3: '',
    caption1: '',
    caption2: '',
    caption3: '',
    sources: ''
  });
  // 2nd state to hold hover status
  const [hovering, setHovering] = useState(false);
  // 3rd state to hold popup status
  const [popup, setPopup] = useState(false);
  return (
    <>
    {popup !== false ? <div className="homeMap_grayer" onClick={()=>setPopup(false)}></div> : ""}

    {/**LEFT SIDE */}
    <div className={"homeMap_map " + (popup !== false ? "homeMap_map--grayed" : "")}>
      <div className="homeMap_poi">
        <p className="homeMap_poiHeader">
          POINTS OF INTEREST
        </p>
        {points.map(p => <p
          key={Math.random()}
          className={"homeMap_poiText " + (hovering === p[0] ? "homeMap_poiText--hovering" : "")}
          onMouseEnter={() => setHovering(p[0])}
          onMouseLeave={() => setHovering(false)}
          onClick={() => {
            setPopup(p[0]);
            setState({
              description: p[3],
              mainImage: p[4],
              pdf1: p[5],
              pdf2: p[6],
              pdf3: p[7],
              img1: p[9],
              img2: p[10],
              img3: p[11],
              caption1: p[12],
              caption2: p[14],
              caption3: p[15],
              sources: p[16]
            });
          }}
        >
          {p[0]}
        </p>)}
      </div>

      {/**RIGHT SIDE */}
      <div className="homeMap_interactive">
        <img className="homeMap_img" src={mapImg} alt="_" />

        {points.map(p => <div
          key={Math.random()}
          className={
            "homeMap_dot " +
            (hovering === p[0] ? "homeMap_dot--hovering" : "")}
          onMouseEnter={() => setHovering(p[0])}
          onMouseLeave={() => setHovering(false)}
          style={{
            marginLeft: `calc(${p[1]}*var(--xUnit))`,
            marginTop: `calc(${p[2]}*var(--xUnit))`
          }}
        >
          <img onClick={() => {
            setPopup(p[0]);
            setState({
              description: p[3],
              mainImage: p[4],
              pdf1: p[5],
              pdf2: p[6],
              pdf3: p[7],
              img1: p[9],
              img2: p[10],
              img3: p[11],
              caption1: p[12],
              caption2: p[14],
              caption3: p[15],
              sources: p[16]

            });
        }} src={maptick} alt="_" />
          <div className="homeMap_dotLabel">{p[0]}</div>
        </div>)}
        
        {/**POPUP */}
        {popup !== false ? 
          <div className="homeMap_popup">
            <div className="homeMap_popupTop">
              <div 
                className="homeMap_popupBack"
                onClick={() => setPopup(false)}
              >
                {/* <div className="homeMap_popupBackArrow">
                  <p className="backArrow">&larr;</p>
                </div>
                <p>BACK TO MAP</p> */}
                <div className='closeBorder'>
                  <span className='close'>&#x2573;</span>
                </div>
                

              </div>
              <div className="homeMap_popupImg"><img src={state.mainImage} alt="_" /></div>
              <div className="homeMap_popupSrc">
                <p>{state.caption1}</p>
                <p>{state.caption2}</p>
                <p>{state.caption3}</p>
              </div>
              <div className="homeMap_popupFeed">
                <Link to={`pdfviewer/${state.pdf1.split('/')[4]}`}>
                  <div className="homeMap_popupFeedImg">
                    <img src={state.img1} alt="_" />
                  </div>
                </Link>
                <Link to={`pdfviewer/${state.pdf2.split('/')[4]}`}>
                  <div className="homeMap_popupFeedImg">
                    <img src={state.img2} alt="_" />
                  </div>
                </Link>
                <Link to={`pdfviewer/${state.pdf3.split('/')[4]}`}>
                  <div className="homeMap_popupFeedImg">
                    <img src={state.img3} alt="_" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="homeMap_popupLocation">{popup}</div>
            <div className="homeMap_popupDescription">
              <ReactMarkdown>{state.description}</ReactMarkdown>
              <Collapsible label="SOURCES" className="Map-Source" contentClassName="Map-Source-contents">
                <ul>
                  {state.sources.map((source, index) => (
                    <li key={index}>
                      <p>
                        <strong>{source.SourceName && `${source.SourceName}: `}</strong>
                        {source.LastName && `${source.LastName}, `}
                        {source.FirstName && `${source.FirstName}, `}
                        {source.Title && `${source.Title}, `}
                        {source.Date && `${source.Date}, `}
                        {source.Description && `${source.Description}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </div>
          </div>
        :""}
      </div>
    </div>
    </>
  )
}

export default Map