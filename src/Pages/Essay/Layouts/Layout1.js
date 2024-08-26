import "./Layout1.css";
import ReactMarkdown from "react-markdown";

function getSafe(arr, i) {
  try {
    return arr[i];
  } catch (e) {
    console.log(e);
  }
}

function layout1({ props }) {
  return (
    <div className="layout1">
      <div className="layout1Banner">
        <h1>{props.title}</h1>
      </div>
      <div className="layout1Banner_hr">
        <figure>
          <img
            src={props.headerImage}
            alt=""
            className="layout1Banner_hr_figure"
          />
          <figcaption>{getSafe(props.MainImage, 1)}</figcaption>
        </figure>
      </div>

      <div className="layout1P1">
        <div className="layout1P1_left">
          <figure>
            <img
              src={
                props.captionedImage1
                  ? [
                      process.env.REACT_APP_API_URL,
                      props.captionedImage1.Image.data.attributes.url,
                    ].join("")
                  : ""
              }
              alt=""
            />
            <figcaption>
              {props.captionedImage1 ? props.captionedImage1.ImgCaption : ""}
            </figcaption>
          </figure>
        </div>
        <ReactMarkdown>{props.section1.SectionText}</ReactMarkdown>
        <div className="layout1P1_right">
          <figure className="layout1P1_img">
            <img src={getSafe(props.Image1, 0)} alt="" />
            <figcaption>{getSafe(props.Image1, 1)}</figcaption>
          </figure>
        </div>
      </div>

      <div className="layout1P2">
        <ReactMarkdown>{props.section2.SectionText}</ReactMarkdown>
      </div>

      <div className="layout1P3">
        <ReactMarkdown>{props.section3.SectionText}</ReactMarkdown>
        <figure>
          <img
            src={
              props.captionedImage2
                ? [
                    process.env.REACT_APP_API_URL,
                    props.captionedImage2.Image.data.attributes.url,
                  ].join("")
                : ""
            }
            alt=""
          />
          <figcaption>
            {props.captionedImage2 ? props.captionedImage2.ImgCaption : ""}
          </figcaption>
        </figure>
      </div>

      <ReactMarkdown className="layout1_author">
        {props.authorCredit}
      </ReactMarkdown>
    </div>
  );
}

export default layout1;
