import React from 'react';
import VARIABLES from '../../../config/.env';
import "./Torch.css";
import ReactMarkdown from 'react-markdown';

function Torch({props}) {
    console.log('line 7')
    console.log(props.captionedImage1.Image.data.attributes.url)
    return (
        <div className="torch">
            {/**BANNER */}
            <div className="torchBanner">
            <iframe title="TorchRelay" src={props.timeLineURL} frameBorder="0" width="100%" height="800"></iframe>
            </div>

            {/**SECTION 1 */}
            <div className="torchSection1_title">
                <h1>{props.title}</h1>
            </div>
            <div className="torchSection1">
                <div className="torchSection1_img">
                    <img src={props.captionedImage1 ? [VARIABLES.fetchBaseUrl, props.captionedImage1.Image.data.attributes.url].join('') : ''} alt=""/>
                    <figcaption>
                    {props.captionedImage1 ? props.captionedImage1.ImgCaption : ''}
                    </figcaption>
                </div>
                <ReactMarkdown className="torchSection1_text">
                    {props.section1.SectionText}
                </ReactMarkdown>
            </div>

            {/**MIDPHOTO */}
            <figure className="torchMidphoto">
            <img src={props.bigImage1 ? [VARIABLES.fetchBaseUrl, props.bigImage1.Image.data.attributes.url].join('') : ''} alt=""/>
                <figcaption title={props.bigImage1.ImgCreditMore}>
                    {props.bigImage1.ImgCredit}
                </figcaption>
            </figure>
            <div className="homeAbout_border"></div>

            {/**SECTION 2 */}
            <div className="torchSection2">
                <div className="torchSection2_left">
                    <h2 className="torchSection2_title">{props.section2.SectionTitle}</h2>
                    <div className="torchSection2_quote">
                        <div >
                            {props.pullQuote1}
                        </div>
                    </div>
                    <ReactMarkdown className="torchSection2_text">
                        {props.section2.SectionText}
                    </ReactMarkdown>

                </div>
                <div className="torchSection2_right">
                    <figure>
                        <img src={props.captionedImage2 ? [VARIABLES.fetchBaseUrl, props.captionedImage2.Image.data.attributes.url].join('') : ''} alt=""/>
                        <figcaption>
                            {props.captionedImage2 ? props.captionedImage2.ImgCaption : ''}
                        </figcaption>
                    </figure>
                    <figure>
                    <img src={props.captionedImage3 ? [VARIABLES.fetchBaseUrl, props.captionedImage3.Image.data.attributes.url].join('') : ''} alt=""/>
                        <figcaption>
                        {props.captionedImage3 ? props.captionedImage3.ImgCaption : ''}
                        </figcaption>
                    </figure>
                </div>
            </div>

            {/**MAP */}
            <div className="torchMap">
                <h2>HOUSTON MAP OF TORCH RELAY</h2>
                <figure>
                <img src={props.bigImage2 ? [VARIABLES.fetchBaseUrl, props.bigImage2.Image.data.attributes.url].join('') : ''} alt={props.bigImage2.ImageAlt}/>
                    <figcaption>
                        {props.bigImage2.ImgCaption}
                    </figcaption>
                </figure>
            </div>

            {/**SECTION 3 */}
            <div className="torchSection3">
                <div className="torchSection3_left">
                    <h2>{props.section3.SectionTitle}</h2>
                    <ReactMarkdown>
                        {props.section3.SectionText}
                    </ReactMarkdown>
                </div>
                <div className="torchSection3_right">
                <img src={props.captionedImage4 ? [VARIABLES.fetchBaseUrl, props.captionedImage4.Image.data.attributes.url].join('') : ''} alt=""/>
                    <figcaption>
                    {props.captionedImage4 ? props.captionedImage4.ImgCaption : ''}
                    </figcaption>
                </div>
            </div>

            {/**CONCLUSION */}
            <div className="torchConclusion">
            <h2>{props.section4.SectionTitle}</h2>
                <ReactMarkdown>
                {props.section4.SectionText}
                </ReactMarkdown>
            </div>

            <ReactMarkdown className="torch_author">
                {props.authorCredit}
            </ReactMarkdown>

            {/**SOURCES */}
            <div className="torchSources">
                <h2>SOURCES</h2>
                {props.sources.map(src => <p key={Math.random()}>{src}</p>)}
            </div>

            {/**PREF CIT */}
            <div className="torch_prefCit">
                <h2>PREFERRED CITATION</h2>
                {props.preferredCitation}
            </div>

        </div>
    )
}

export default Torch
