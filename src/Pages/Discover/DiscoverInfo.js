import React, { useState, useEffect } from 'react'
import {
    useParams,
    Link,
} from "react-router-dom";
import "./DiscoverInfo.css"; // This is section 1.
import ReactMarkdown from 'react-markdown';
import VARIABLES from '../../config/.env';
import button from "./res/toform.png";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer.js"

function DiscoverInfo() {
    const { storyId } = useParams(); // WILL BE USED TO GRAB STRAPI DATA

    const { fetchBaseUrl } = VARIABLES;

    // state to hold content from Strapi
    const [state, setState] = useState({
        bigquote1: '',
        bigquote2: '',
        career: [],
        dob: '',
        imgcaption: '',
        maintext: '',
        name: '',
        firstname:'',
        lastname:'',
        profilepic: '',
        profilepic_alt: '',
        role: '',
        rolesAtNwc: [],
        sources: [],
        state: '',
        usertags: [],
        videourl: '',

    });
    // grab page data from strapi
    useEffect(() => {
        // this pattern is pretty much seen on all data-driven pages
        fetch(`${fetchBaseUrl}/api/content-discover-stories?filters[id][$eq]=${storyId}&populate=*`)
            .then(res => res.json())
            .then(data => {
                
                const {attributes:
                            {bigquote1, bigquote2, career, dob, imgcaption, maintext, name, firstname, lastname, role, rolesAtNwc, 
                                sources, VideoUrl, usertags}}= data.data[0]
                // IF Conditional statement to ensure data[0].profilepic[0] TypeError resolved
                // If it exists, we can set the state to that profile pic
                // Else set it to our "button" picture, this is subject to change
                let profilepic = state.profilepic
                let profilepic_alt = state.profilepic_alt
                if (data.data[0].attributes.profilepic.data) {
                    profilepic = `${fetchBaseUrl}${data.data[0].attributes.profilepic.data.attributes.url}`;
                    profilepic_alt = data.data[0].attributes.profilepic.data.attributes.alternativeText;
                } else {

                    profilepic = button
                    profilepic_alt = "No Picture Available"
                }

                // here i keep the attribute names close to what is served in strapi.
                // there is still come cleaning I do, as useState does NOT like nested loops.
                // for example
                // setState({ nestedEl: { a: 'b' } }); // this will crash things.
                // this is why the occasional map function is seen in below's assignments.
                // we want [literal1, literal2, ...], not [{object1}, {object2}, ...] (which is the purpose of the occasional .map)
                setState({
                    bigquote1: bigquote1,
                    bigquote2: bigquote2,
                    career: career.map(c => c.text),
                    dob: dob,
                    imgcaption: imgcaption,
                    maintext: maintext,
                    name: name,
                    firstname: firstname,
                    lastname: lastname,
                    profilepic,
                    profilepic_alt,
                    role: role,
                    rolesAtNwc: rolesAtNwc.map(r => r.text),
                    sources: sources.map(s => s.text),
                    videourl: VideoUrl,
                    state: data.data[0].attributes.state,
                    usertags: usertags.map(t => t.text),
                });
            })
            .catch(err => console.log(err));
    }, []); // eslint-disable-line

    return (
        <div className="discoverInfo">
            {/**BANNER */}
            <div className="discoverInfoBanner">
                <div className="discoverInfoBanner_left">
                    <Link to="/discover">&larr; BACK TO DISCOVER PAGE</Link>
                    <h1>{state.firstname} {state.lastname}</h1>
                </div>
            </div>

            {/**BODY */}
            <div className="discoverInfoBody">
                {/**BODY_LEFT */}
                <div className="discoverInfoBody_left">
                    <div className='discoverInfoBody_profile'>
                        <img src={state.profilepic} alt={state.profilepic_alt} />
                        <p className="discoverInfoBody_caption">{state.imgcaption}</p>
                        <h3>NAME</h3>
                        <p>{state.firstname} {state.lastname}</p>

                        <h3>BORN</h3>
                        <p>{state.dob}</p>

                        <h3>CAREER</h3>
                        {state.career.map(r => <p key={r}>
                            {r}
                        </p>)}

                        <h3>ROLE AT NWC</h3>
                        {state.rolesAtNwc.map(r => <p key={r}>
                            {r}
                        </p>)}

                    </div>
                    <Link to='/Forms/CorrectionsForm' className="discoverInfoBody_submit">SUBMIT CORRECTIONS</Link>
                </div>

                {/**BODY_RIGHT */}
                <div className="discoverInfoBody_right">

                    <h2 className="discoverInfoBody_video">
                        <VideoPlayer videourl={state.videourl} />
                    </h2>

                    <h2 className="discoverInfoBody_bioh">
                        {state.firstname} {state.lastname}
                    </h2>

                    {state.bigquote1 !== '' && state.bigquote1 !== null ?
                        <div className="discoverInfoBody_bigquote">
                            <div className="quote_topleft"></div>
                            <div className="quote_topright"></div>
                            <p>{state.bigquote1}</p>
                            <div className="quote_bottomleft"></div>
                            <div className="quote_bottomright"></div>
                        </div> : null}

                    <div className="discoverInfoBody_text">
                        <ReactMarkdown>
                            {state.maintext}
                        </ReactMarkdown>
                    </div>

                    {state.bigquote2 !== '' && state.bigquote2 !== null ?
                    
                        <div className="discoverInfoBody_bigquote">
                            <div className="quote_topleft"></div>
                            <div className="quote_topright"></div>
                            
                            <p>{state.bigquote2}</p>
                            <div className="quote_bottomleft"></div>
                            <div className="quote_bottomright"></div>
                        </div> : null}

                    <div className="discoverInfoBody_sources">
                        <h3>Sources</h3>
                        {state.sources.map(s => <p key={s}>
                            {s}
                        </p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverInfo
