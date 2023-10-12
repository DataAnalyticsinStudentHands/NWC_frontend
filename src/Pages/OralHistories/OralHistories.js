import React, { useState, useEffect } from 'react'

import oral_histories_bannerpic from './res/oral_histories_bannerpic.png';
import oral_histories_button from "../../assets/res/button-oral-histories.png";
import bible_women from './res/bible_women.png'
import pro_plan_progress from './res/pro_plan_progress.png'
import placeholder from './res/placeholder.png'
import Carousel from './components/Carousel';
import { ParticipantsTable } from './components/ParticipantsTable';
import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import ReactMarkdown from 'react-markdown';

function OralHistories() {

    const [state, setState] = useState({
        bannerText: '',
        imgCredit: '',
        meanText: '',
        exploreText: '',
        featured_videos: [],
        sortoptions: []
    });

    const [participants, setParticipants] = useState([])
    const [roles, setRoles] = useState([]);
    
    useEffect(() => {
		fetch([process.env.REACT_APP_API_URL_LOCAL, 'api/content-oral-history?populate=*'].join('/'))
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImage_Credit,
                            What_NWC_Means,
                            ExploreText,
						},
					},
				} = data;
                setState({
                    bannerText: BannerText,
                    imgCredit: BannerImage_Credit,
                    meanText: What_NWC_Means,
                    exploreText: ExploreText,
                  });

			});
        }, [])
        useEffect(() => {
            fetch([process.env.REACT_APP_API_URL_LOCAL, "api/content-discover-stories?populate=*"].join('/'))
              .then((res) => res.json())
              .then((data) => {
                setParticipants(
                  data.data
                    .filter((d) => d.attributes.VideoUrl !== null) // Filter out items with null VideoURL
                    .map((d) => {
                      const name = d.attributes.name;
                      const id = d.id;
                      const videoURL = d.attributes.VideoUrl;
                      const state = d.attributes.state;
                      const profilepic = d.attributes.profilepic.data ? [process.env.REACT_APP_API_URL, d.attributes.profilepic.data.attributes.url].join(''): placeholder; // Use the imported image
                      const featured = d.attributes.featured
                      const role = d.attributes.role  
                      return [id, name, videoURL, profilepic, state, featured, role];
                    })
                );
              })
              .catch((err) => console.log(err));
          }, []); // eslint-disable-line

          useEffect(() => {
            fetch([process.env.REACT_APP_API_URL_LOCAL, "api/nwc-roles?sort=role&populate=*"].join('/'))
              .then((res) => res.json())
              .then((data) => {
                const filteredRoles = data.data
                .filter((d) => d.attributes.OralHistory_Role_Toggle === true && !d.attributes.role.includes('Other Role')) //filter for toggle and 'Other Role'
                .map((d) => d.attributes.role);
        
                // Check if "Other Role" is not already in the array and add it
                    if (!filteredRoles.includes("Other Role")) {
                        filteredRoles.push("Other Role");
                    }
                
                    setRoles(filteredRoles);
                    })
              .catch((err) => console.log(err));
          }, []); // eslint-disable-line

    return (
        <Stack direction='column' spacing={10}>
            {/* BANNER */}
            <Banner
                imgLeft={oral_histories_button}
                text={state.bannerText}
                imgRight={oral_histories_bannerpic}
                imgCredit={state.imgCredit}
            />
            {/* WHAT THE NWC MEANS */}
            <Stack direction='column' gap={4} margin={'0 5% 5% 5%'} className="OralHistories_NWC_container">
                <Stack direction='row' className='item'>
                    <div className="item-left">
                        <h1>VIDEO HERE</h1>
                        
                    </div>
                    <div className="item-right">
                        <h1>WHAT THE NWC MEANS TO ME</h1>
                        <ReactMarkdown style={{ fontWeight: "normal" }}>{state.meanText}</ReactMarkdown>
                    </div>
                </Stack>
            </Stack>

            {/* FEATURED */}
            <Stack direction='column' className="OralHistories_Featured_container">
                <div className="header-container">
                    <h1>Featured Oral Histories</h1>
                </div>               
                <div className="featured_video_container" >
                    <Carousel videos={participants}/>
                </div>
            </Stack>
            {/* BANNER 2 */}
            <Stack direction='column'  className="OralHistories_Voice_container">
                <h2 className="centered-text">Listening to<br/>Every Voice</h2>
                    <Stack direction='row' className='item'>
                        <div className="item-left">
                            <img src={bible_women} alt="minority_rights_plank" />                     
                        </div>
                        <div className="item-right">
                            <img src={pro_plan_progress} alt="minority_rights_plank" />
                            <p>Photo by {state.imgCredit}</p>
                        </div>
                    </Stack>
            </Stack>

            {/* EXPLORE ORAL HISTORIES */}
            <Stack direction='column' gap={4} margin={'0 5% 5% 5%'} className="OralHistories_NWC_container">
                <Stack direction='row' className='item'>
                    <div className="item-right">
                        <h1>EXPLORE ORAL HISTORIES</h1>
                        <ReactMarkdown style={{ fontWeight: "normal" }}>{state.exploreText}</ReactMarkdown>
                    </div>
                </Stack>
                    <ParticipantsTable participants={participants} roles={roles} />
            </Stack>
        </Stack>
    );
}

export default OralHistories;