import { useEffect, useState } from "react";
import "./Why.css";
import buttonwhy from "../../assets/res/button-why-the-nwc-matters.png";
import whybannerhuman from "./res/whybannerhuman.png";

import { Link } from "react-router-dom";
import InfoVideo from "../../Components/Avalon/InfoVideo";
import Carousel3 from "../../Components/Carousel/Carousel3";
import ReactMarkdown from "react-markdown";

function Why() {
  const [pageState, setPageState] = useState({
    historicalOverview: "",
    bannerPhotoCredit: "",
    bannerPhotoCredit_more: "",
    timelineIframeSrc: "",
    documents: [],
    videoURL: "",
    videoTitle: "",
  });

  const [essays, setEssays] = useState([[]]);

  useEffect(() => {
    fetch(
      [
        process.env.REACT_APP_API_URL,
        "api/content-why-the-nwc-matter?populate[PrimaryDocuments][populate]=*",
      ].join("/")
    )
      .then((res) => res.json())
      .then((data) => {
        const {
          data: {
            attributes: {
              PrimaryDocuments,
              HistoricalOverview,
              BannerPhotoCredit,
              BannerPhotoCredit_more,
              TimelineIframeSrc,
              VideoURL,
              VideoTitle,
            },
          },
        } = data;

        //thumbnails and pdfs should prop be in an array
        const primaryDocuments = PrimaryDocuments.map((pd) => {
          // [THUMBNAIL, PDF]
          const thumbnail = [
            process.env.REACT_APP_API_URL,
            pd.THUMBNAIL.data.attributes.url,
          ].join("");
          const pdf = [
            process.env.REACT_APP_API_URL,
            pd.PDF.data.attributes.url,
          ].join("");

          return [thumbnail, pdf];
        });

        setPageState({
          historicalOverview: HistoricalOverview,
          bannerPhotoCredit: BannerPhotoCredit,
          bannerPhotoCredit_more: BannerPhotoCredit_more,
          timelineIframeSrc: TimelineIframeSrc,
          documents: primaryDocuments,
          videoURL: VideoURL,
          videoTitle: VideoTitle,
        });
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []); // eslint-disable-line

  useEffect(() => {
    fetch(
      [process.env.REACT_APP_API_URL, "api/content-essays?populate=*"].join("/")
    )
      .then((res) => res.json())
      .then((data) => {
        setEssays(
          data.data.map((d) => {
            const featured = d.attributes.Featured;
            let thumbnail = [
              process.env.REACT_APP_API_URL,
              d.attributes.Thumbnail.data.attributes.url,
            ].join("");
            const id = d.id;
            const title = d.attributes.ShortTitle;

            return ["essay", id, thumbnail, title, featured];
          })
        );
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line

  return (
    <div className="why">
      {/**BANNER */}
      <div className="whyBanner">
        <img className="whyBanner_button" src={buttonwhy} alt="" />
        <div className="whyBanner_card">
          <h2>HISTORICAL OVERVIEW</h2>
          <ReactMarkdown>{pageState.historicalOverview}</ReactMarkdown>
          <Link to="/essay/1">
            <p className="why_readmore">READ MORE</p>
          </Link>
        </div>
        <figure>
          <img src={whybannerhuman} alt="" />
          <figcaption title={pageState.bannerPhotoCredit_more}>
            {pageState.bannerPhotoCredit}
          </figcaption>
        </figure>
      </div>

      {/**VIDEO */}
      <div className="whyoutsideVideo">
        <div className="whyVideo">
          <InfoVideo src={pageState.videoURL} title={pageState.videoTitle} />
        </div>
      </div>

      {/**TIMELINE */}
      <iframe
        className=""
        title="Timeline Iframe"
        src={pageState.timelineIframeSrc}
        width="100%"
        height="650"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        frameBorder="0"
      ></iframe>

      <div className="whylowerSection">
        {/**ESSAYS */}
        <div className="whyEssays">
          <h2>FEATURED ESSAYS</h2>
          <div className="whyEssays_list">
            <Carousel3 images={essays} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;
