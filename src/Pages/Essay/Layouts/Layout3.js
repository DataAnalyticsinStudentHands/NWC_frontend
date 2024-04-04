import "./Layout3.css";
import ReactMarkdown from 'react-markdown';

function Layout3({props}) {

    return (
        <div className="layout3">
            <h1>{props.title}</h1>
            <img src={props.headerImage} alt=""/>
            <p className="layout3_quote">{props.pullQuote1}</p>
            <div className="layout3_section1">
                <ReactMarkdown>
                {props.section1.SectionText}
                </ReactMarkdown>
            </div>
            <div className="layout3_section2">
                <h2>{props.section2.SectionTitle}</h2>
                <ReactMarkdown >
                    {props.section2.SectionText}
                </ReactMarkdown>
            </div>
            <div className="layout3_section3">
                <ReactMarkdown className="layout3_section3Text">
                    {props.section3.SectionText}
                </ReactMarkdown>
                <p className="layout3_section3Quote">{props.pullQuote2}</p>
            </div>
            <ReactMarkdown className="layout3_section2">
                {props.section4.SectionText}
            </ReactMarkdown>
            <ReactMarkdown className="layout3_author">
                {props.authorCredit}
            </ReactMarkdown>
            <div className="layout3_sources">
                <h2>SOURCES</h2>
                {props.sources.map(src => <p key={Math.random()}>{src}</p>)}
            </div>

            {/**PREF CIT */}
            <div className="layout3_prefCit">
                <h2>PREFERRED CITATION</h2>
                {props.preferredCitation}
            </div>

        </div>
    )
}

export default Layout3
