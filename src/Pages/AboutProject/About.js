import React, { useState, useEffect } from 'react'
import "./About.css";

import button from "./res/button.png";
import chick from './res/chick.png';
import tl from './res/tl.png';

import VARIABLES from "../../config/.env.js";

import MeetTheTeam from '../MeetTheTeam/MeetTheTeam';

function About() {
  const { fetchBaseUrl } = VARIABLES;

  // one state to hold the regular page content loaded from Strapi
  const [state, setState] = useState({
    aboutBanner_card: '',
    bannerimage_credit: '',
    bannerimagecredit_more: '',
    aboutTimeline_1: '',
    aboutTimeline_2: '',
    aboutTimeline_3: '',
    aboutTimeline_4: '',
    aboutTimeline_5: '',
    aboutDocuments_ddlink: '',
    aboutDocuments_cblink: '',
    aboutDocuments_aplink: '',
    aboutDocuments_frlink: ''
  });

  const contributors = {
    "PROJECT LEADS": [
      {
        name: "Nancy Beck Young",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///8oKCiPj4/7+/sFBQVlZWW9vb35+fn19fXo6OjJyckrKyvMzMxdXV0TExNeXl4wMDBqamq8vLyXl5dXV1fr6+vU1NQNDQ1ubm40NDS0tLQ5OTkeHh6lpaXExMScnJzf399JSUncR1bBAAAC8UlEQVR4nO3aW3PaMBCGYYvIlDMJ4UxSmv7/H1nLxkYywvaaprN03ueiF2Ws0cdubFkiSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B5p86fNH/9Dq/OP3Pun7Lq0PYQs5Gc2BzeR87Dlu5N6MRdvwoF/Ns9keW6rcs2snMiLaBrtqoQDwUVZdX4Zs8kixENk/zsxu7zOnccc6EqYrN0lr/cbcWJsFlFSRV0JXUBrbV7FqG0WUBhRU8JlUUFnE6liWlTQ2Qkmoimh+xss2Hijbi8BRRFVJdxlLepVsf7xpApo7LHzoKoSJtNrhpsqpmXA7N/RrPuYihK6QPMqoDWLoIp7r4LjwZPeaZy516iL6rmYugqWyUUV1JYwqKIxw6pR/QqOZN+ZuoTRRk39Fp3JVm26EuamZhTcbtJrBa24ggoT1m43bhm+DCsopC6hE/4t7h9o0URpwuC5ePjyAr7Jx1KY0N0/p16jBgHlL7EKE+b8KpZJx92Xah6dCYMqPtKiidaETj1iVsFe+yx6EwbPxb4tmihOmNXr7Afs/UUpTrj/8m42dnF3e6qF2oTBSsYZ9twMVptwXwtYf1/sTGfCNHibKL32alSdCW8q+ECj6kwYq6DTp1FVJvTfB8fHs/dcXMirqDFh8Lp0DJfh8ojqEuY728YPmC/DI9tTHalL6G382mKxnTbvo7bRl3B7LVix2K6/L949tonTldA7fLHh69K0drt53h3hbXTL4nY3/GkTNmw6+dtTkueiroSNhy9+o266j6kq4fZ+BevHNr87D6oq4cHkZSoqGOnD4tjGnXOfug+qKGFWptXlmujWfVVFUUBNCV2GQ7RFy0/LiKfnvZe6KtrGw5d51sfvookoS+iq2HD4kjfqScmapvrhiOiwyEX8aE6wFq5Lq199rSVXdfCxGhaWf3lgqeVlHquWb+4Ban4u+V0zURNQzUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Kf+AN1iGFg+mCFSAAAAAElFTkSuQmCC",
      },
      {
        name: "Lola Babalola",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///8oKCiPj4/7+/sFBQVlZWW9vb35+fn19fXo6OjJyckrKyvMzMxdXV0TExNeXl4wMDBqamq8vLyXl5dXV1fr6+vU1NQNDQ1ubm40NDS0tLQ5OTkeHh6lpaXExMScnJzf399JSUncR1bBAAAC8UlEQVR4nO3aW3PaMBCGYYvIlDMJ4UxSmv7/H1nLxkYywvaaprN03ueiF2Ws0cdubFkiSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B5p86fNH/9Dq/OP3Pun7Lq0PYQs5Gc2BzeR87Dlu5N6MRdvwoF/Ns9keW6rcs2snMiLaBrtqoQDwUVZdX4Zs8kixENk/zsxu7zOnccc6EqYrN0lr/cbcWJsFlFSRV0JXUBrbV7FqG0WUBhRU8JlUUFnE6liWlTQ2Qkmoimh+xss2Hijbi8BRRFVJdxlLepVsf7xpApo7LHzoKoSJtNrhpsqpmXA7N/RrPuYihK6QPMqoDWLoIp7r4LjwZPeaZy516iL6rmYugqWyUUV1JYwqKIxw6pR/QqOZN+ZuoTRRk39Fp3JVm26EuamZhTcbtJrBa24ggoT1m43bhm+DCsopC6hE/4t7h9o0URpwuC5ePjyAr7Jx1KY0N0/p16jBgHlL7EKE+b8KpZJx92Xah6dCYMqPtKiidaETj1iVsFe+yx6EwbPxb4tmihOmNXr7Afs/UUpTrj/8m42dnF3e6qF2oTBSsYZ9twMVptwXwtYf1/sTGfCNHibKL32alSdCW8q+ECj6kwYq6DTp1FVJvTfB8fHs/dcXMirqDFh8Lp0DJfh8ojqEuY728YPmC/DI9tTHalL6G382mKxnTbvo7bRl3B7LVix2K6/L949tonTldA7fLHh69K0drt53h3hbXTL4nY3/GkTNmw6+dtTkueiroSNhy9+o266j6kq4fZ+BevHNr87D6oq4cHkZSoqGOnD4tjGnXOfug+qKGFWptXlmujWfVVFUUBNCV2GQ7RFy0/LiKfnvZe6KtrGw5d51sfvookoS+iq2HD4kjfqScmapvrhiOiwyEX8aE6wFq5Lq199rSVXdfCxGhaWf3lgqeVlHquWb+4Ban4u+V0zURNQzUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Kf+AN1iGFg+mCFSAAAAAElFTkSuQmCC",
      },
      {
        name: "Lola Babalola 2",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///8oKCiPj4/7+/sFBQVlZWW9vb35+fn19fXo6OjJyckrKyvMzMxdXV0TExNeXl4wMDBqamq8vLyXl5dXV1fr6+vU1NQNDQ1ubm40NDS0tLQ5OTkeHh6lpaXExMScnJzf399JSUncR1bBAAAC8UlEQVR4nO3aW3PaMBCGYYvIlDMJ4UxSmv7/H1nLxkYywvaaprN03ueiF2Ws0cdubFkiSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B5p86fNH/9Dq/OP3Pun7Lq0PYQs5Gc2BzeR87Dlu5N6MRdvwoF/Ns9keW6rcs2snMiLaBrtqoQDwUVZdX4Zs8kixENk/zsxu7zOnccc6EqYrN0lr/cbcWJsFlFSRV0JXUBrbV7FqG0WUBhRU8JlUUFnE6liWlTQ2Qkmoimh+xss2Hijbi8BRRFVJdxlLepVsf7xpApo7LHzoKoSJtNrhpsqpmXA7N/RrPuYihK6QPMqoDWLoIp7r4LjwZPeaZy516iL6rmYugqWyUUV1JYwqKIxw6pR/QqOZN+ZuoTRRk39Fp3JVm26EuamZhTcbtJrBa24ggoT1m43bhm+DCsopC6hE/4t7h9o0URpwuC5ePjyAr7Jx1KY0N0/p16jBgHlL7EKE+b8KpZJx92Xah6dCYMqPtKiidaETj1iVsFe+yx6EwbPxb4tmihOmNXr7Afs/UUpTrj/8m42dnF3e6qF2oTBSsYZ9twMVptwXwtYf1/sTGfCNHibKL32alSdCW8q+ECj6kwYq6DTp1FVJvTfB8fHs/dcXMirqDFh8Lp0DJfh8ojqEuY728YPmC/DI9tTHalL6G382mKxnTbvo7bRl3B7LVix2K6/L949tonTldA7fLHh69K0drt53h3hbXTL4nY3/GkTNmw6+dtTkueiroSNhy9+o266j6kq4fZ+BevHNr87D6oq4cHkZSoqGOnD4tjGnXOfug+qKGFWptXlmujWfVVFUUBNCV2GQ7RFy0/LiKfnvZe6KtrGw5d51sfvookoS+iq2HD4kjfqScmapvrhiOiwyEX8aE6wFq5Lq199rSVXdfCxGhaWf3lgqeVlHquWb+4Ban4u+V0zURNQzUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Kf+AN1iGFg+mCFSAAAAAElFTkSuQmCC",
      },
    ],
    "PROJECT LEADS 2": [
      {
        name: "ABCDEFG",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///8oKCiPj4/7+/sFBQVlZWW9vb35+fn19fXo6OjJyckrKyvMzMxdXV0TExNeXl4wMDBqamq8vLyXl5dXV1fr6+vU1NQNDQ1ubm40NDS0tLQ5OTkeHh6lpaXExMScnJzf399JSUncR1bBAAAC8UlEQVR4nO3aW3PaMBCGYYvIlDMJ4UxSmv7/H1nLxkYywvaaprN03ueiF2Ws0cdubFkiSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B5p86fNH/9Dq/OP3Pun7Lq0PYQs5Gc2BzeR87Dlu5N6MRdvwoF/Ns9keW6rcs2snMiLaBrtqoQDwUVZdX4Zs8kixENk/zsxu7zOnccc6EqYrN0lr/cbcWJsFlFSRV0JXUBrbV7FqG0WUBhRU8JlUUFnE6liWlTQ2Qkmoimh+xss2Hijbi8BRRFVJdxlLepVsf7xpApo7LHzoKoSJtNrhpsqpmXA7N/RrPuYihK6QPMqoDWLoIp7r4LjwZPeaZy516iL6rmYugqWyUUV1JYwqKIxw6pR/QqOZN+ZuoTRRk39Fp3JVm26EuamZhTcbtJrBa24ggoT1m43bhm+DCsopC6hE/4t7h9o0URpwuC5ePjyAr7Jx1KY0N0/p16jBgHlL7EKE+b8KpZJx92Xah6dCYMqPtKiidaETj1iVsFe+yx6EwbPxb4tmihOmNXr7Afs/UUpTrj/8m42dnF3e6qF2oTBSsYZ9twMVptwXwtYf1/sTGfCNHibKL32alSdCW8q+ECj6kwYq6DTp1FVJvTfB8fHs/dcXMirqDFh8Lp0DJfh8ojqEuY728YPmC/DI9tTHalL6G382mKxnTbvo7bRl3B7LVix2K6/L949tonTldA7fLHh69K0drt53h3hbXTL4nY3/GkTNmw6+dtTkueiroSNhy9+o266j6kq4fZ+BevHNr87D6oq4cHkZSoqGOnD4tjGnXOfug+qKGFWptXlmujWfVVFUUBNCV2GQ7RFy0/LiKfnvZe6KtrGw5d51sfvookoS+iq2HD4kjfqScmapvrhiOiwyEX8aE6wFq5Lq199rSVXdfCxGhaWf3lgqeVlHquWb+4Ban4u+V0zURNQzUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Kf+AN1iGFg+mCFSAAAAAElFTkSuQmCC",
      },
      {
        name: "HIJKLMNOP",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD///8oKCiPj4/7+/sFBQVlZWW9vb35+fn19fXo6OjJyckrKyvMzMxdXV0TExNeXl4wMDBqamq8vLyXl5dXV1fr6+vU1NQNDQ1ubm40NDS0tLQ5OTkeHh6lpaXExMScnJzf399JSUncR1bBAAAC8UlEQVR4nO3aW3PaMBCGYYvIlDMJ4UxSmv7/H1nLxkYywvaaprN03ueiF2Ws0cdubFkiSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B5p86fNH/9Dq/OP3Pun7Lq0PYQs5Gc2BzeR87Dlu5N6MRdvwoF/Ns9keW6rcs2snMiLaBrtqoQDwUVZdX4Zs8kixENk/zsxu7zOnccc6EqYrN0lr/cbcWJsFlFSRV0JXUBrbV7FqG0WUBhRU8JlUUFnE6liWlTQ2Qkmoimh+xss2Hijbi8BRRFVJdxlLepVsf7xpApo7LHzoKoSJtNrhpsqpmXA7N/RrPuYihK6QPMqoDWLoIp7r4LjwZPeaZy516iL6rmYugqWyUUV1JYwqKIxw6pR/QqOZN+ZuoTRRk39Fp3JVm26EuamZhTcbtJrBa24ggoT1m43bhm+DCsopC6hE/4t7h9o0URpwuC5ePjyAr7Jx1KY0N0/p16jBgHlL7EKE+b8KpZJx92Xah6dCYMqPtKiidaETj1iVsFe+yx6EwbPxb4tmihOmNXr7Afs/UUpTrj/8m42dnF3e6qF2oTBSsYZ9twMVptwXwtYf1/sTGfCNHibKL32alSdCW8q+ECj6kwYq6DTp1FVJvTfB8fHs/dcXMirqDFh8Lp0DJfh8ojqEuY728YPmC/DI9tTHalL6G382mKxnTbvo7bRl3B7LVix2K6/L949tonTldA7fLHh69K0drt53h3hbXTL4nY3/GkTNmw6+dtTkueiroSNhy9+o266j6kq4fZ+BevHNr87D6oq4cHkZSoqGOnD4tjGnXOfug+qKGFWptXlmujWfVVFUUBNCV2GQ7RFy0/LiKfnvZe6KtrGw5d51sfvookoS+iq2HD4kjfqScmapvrhiOiwyEX8aE6wFq5Lq199rSVXdfCxGhaWf3lgqeVlHquWb+4Ban4u+V0zURNQzUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Kf+AN1iGFg+mCFSAAAAAElFTkSuQmCC",
      },
    ],
  };

  const [currentTab, setCurrentTab] = useState("PROJECT LEADS");

  // grab page data from strapi
  useEffect(() => {
    fetch(`${fetchBaseUrl}/content-about`)
      .then(res => res.json())
      .then(data => {
        setState({
          banner_text: data.Banner_text,
          bannerimage_credit: data.BannerImage_Credit,
          bannerimagecredit_more: data.BannerImageCredit_more,
          aboutTimeline_1: data.aboutTimeline_1,
          aboutTimeline_2: data.aboutTimeline_2,
          aboutTimeline_3: data.aboutTimeline_3,
          aboutTimeline_4: data.aboutTimeline_4,
          aboutTimeline_5: data.aboutTimeline_5,
          aboutDocuments_ddlink: data.aboutDocuments_ddlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_ddlink[0].url : undefined,
          aboutDocuments_cblink: data.aboutDocuments_cblink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_cblink[0].url : undefined,
          aboutDocuments_aplink: data.aboutDocuments_aplink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_aplink[0].url : undefined,
          aboutDocuments_frlink: data.aboutDocuments_frlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_frlink[0].url : undefined,
          aboutDocuments_eclink: data.aboutDocuments_eclink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_eclink[0].url : undefined,
          aboutDocuments_fmlink: data.aboutDocuments_fmlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_fmlink[0].url : undefined,
          aboutDocuments_tblink: data.aboutDocuments_tblink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_tblink[0].url : undefined,
          aboutDocuments_tdlink: data.aboutDocuments_tdlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_tdlink[0].url : undefined,
          aboutDocuments_edlink: data.aboutDocuments_edlink.length !== 0 ? fetchBaseUrl + data.aboutDocuments_edlink[0].url : undefined,
        });
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  return (
    <div className="about">

      {/**BANNER */}
      <div className="aboutBanner">
        <img src={button} className="aboutBanner_button" alt="_" />
        <div className="aboutBanner_card">
          <p>
            {state.banner_text}
          </p>
        </div>
        <div className="aboutBanner_credit" title={state.bannerimagecredit_more}><p>PHOTO BY {state.bannerimage_credit}</p></div>
        <img src={chick} className="aboutBanner_chick" alt="_" />
      </div>

      {/**TIMELINE */}
      <div className="aboutTimeline">
        <div className="aboutTimeline_header"><p>PROJECT TIMELINE</p></div>
        <div className="aboutTimeline_annot aboutTimeline_annot1">
          <div className="aboutTimeline_annotNo"><p>1</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_1}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot2">
          <div className="aboutTimeline_annotNo"><p>2</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_2}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot3">
          <div className="aboutTimeline_annotNo"><p>3</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_3}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot4">
          <div className="aboutTimeline_annotNo"><p>4</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_4}</div>
        </div>
        <div className="aboutTimeline_annot aboutTimeline_annot5">
          <div className="aboutTimeline_annotNo"><p>5</p></div>
          <div className="aboutTimeline_annotText">{state.aboutTimeline_5}</div>
        </div>
        <img src={tl} className="aboutTimeline_tl" alt="_" />
      </div>

      {/**DOCUMENTS */}
      <div className="aboutDocuments">
        {state.aboutDocuments_ddlink &&
          <a href={state.aboutDocuments_ddlink} target="_blank" rel="noreferrer" >
            <div>
              DESIGN DOCUMENTS
            </div>
          </a>
        }
        {state.aboutDocuments_cblink &&
          <a href={state.aboutDocuments_cblink} target="_blank" rel="noreferrer" >
            <div>
              CODEBOOK
            </div>
          </a>
        }
        {state.aboutDocuments_eclink &&
          <a href={state.aboutDocuments_eclink} target="_blank" rel="noreferrer" >
            <div>
              ETHICS OF CARE
            </div>
          </a>
        }
        {state.aboutDocuments_fmlink &&
          <a href={state.aboutDocuments_fmlink} target="_blank" rel="noreferrer" >
            <div>
              FEMINIST DIGITAL HUMANITIES MANIFESTA
            </div>
          </a>
        }
        {state.aboutDocuments_tdlink &&
          <a href={state.aboutDocuments_tdlink} target="_blank" rel="noreferrer" >
            <div>
              TERMINILOGY DOCUMENT
            </div>
          </a>
        }
        {state.aboutDocuments_tblink &&
          <a href={state.aboutDocuments_tblink} target="_blank" rel="noreferrer" >
            <div>
              TECHNICAL BACKGROUND
            </div>
          </a>
        }
        {state.aboutDocuments_edlink &&
          <a href={state.aboutDocuments_edlink} target="_blank" rel="noreferrer" >
            <div>
              EDITING DOCUMENT
            </div>
          </a>
        }
        {state.aboutDocuments_frlink &&
          <a href={state.aboutDocuments_frlink} target="_blank" rel="noreferrer" >
            <div>
              FURTHER READING
            </div>
          </a>
        }
      </div>

      {/**MEET */}
      <MeetTheTeam />

      {/**TABLE */}
      <div className="aboutTable">
        <div className="aboutTable_tabs">
          {
            Object.keys(contributors).map(k =>
              <div
                key={Math.random() * Math.random()}
                className={`aboutTable_tab ${currentTab === k ? 'aboutTable_tab--active' : ''}`}
                onClick={e => setCurrentTab(k)}
              >
                <p>{k}</p>
              </div>
            )
          }
        </div>
        <div className="aboutTable_entries">
          {
            contributors[currentTab].map(c =>
              <div
                className="aboutTable_entry"
                key={Math.random()}
              >
                <img src={c.img} alt="_" />
                <div className="aboutTable_alpha">
                  <p className="aboutTable_name">{c.name}</p>
                  <p className="aboutTable_txt">{c.txt}</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default About
