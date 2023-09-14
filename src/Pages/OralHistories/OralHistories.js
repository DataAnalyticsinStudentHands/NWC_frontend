import React, { useState, useEffect } from 'react'

import oral_histories_bannerpic from './res/oral_histories_bannerpic.png';
import oral_histories_button from "../../assets/res/button-oral-histories.png";
import bible_women from './res/bible_women.png'
import pro_plan_progress from './res/pro_plan_progress.png'
import InfoVideo from "../../Components/Avalon/InfoVideo";
import Carousel3 from '../../Components/Carousel/Carousel3';

import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import ReactMarkdown from 'react-markdown';

function OralHistories() {

    const [state, setState] = useState({
        bannerText: '',
        imgCredit: '',
        meanText: '',
        exploreText: ''
    });

      const [featured, setFeatured] = useState({
        featured_video1: '',
        featured_video2: ''
    });



    useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL_LOCAL}/api/content-oral-history`)
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImage_Credit,
                            What_NWC_Means,
                            ExploreText,
                            featured_video1,
                            featured_video2,
						},
					},
				} = data;
                setState({
                    bannerText: BannerText,
                    imgCredit: BannerImage_Credit,
                    meanText: What_NWC_Means,
                    exploreText: ExploreText
                  });
                setFeatured({
                    featured_video1: featured_video1,
                    featured_video2: featured_video2
                })
			});
        }, [])

        console.log(featured)
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
                <Stack direction='row' margin={'0 0 0 20%'} className='featured_video_container'>
                        <InfoVideo src={featured.featured_video1} />
                </Stack>
            </Stack>
            {/* BANNER 2 */}
            <Stack direction='column'  className="OralHistories_Voice_container">
                <Stack direction='row' className='item'>
                    <div className="item-left">
                        <img src={bible_women} alt="minority_rights_plank" />                     
                    </div>
                    <div className="item-right">
                        <img src={pro_plan_progress} alt="minority_rights_plank" />

                    </div>
                </Stack>
            </Stack>

            {/* EXPLORE ORAL HISTORIES */}
            <Stack direction='column' gap={4} margin={'0 5% 5% 5%'} className="OralHistories_NWC_container">
                <Stack direction='row' className='item'>
                    <div className="item-right">
                        <h1>Explore oral histories</h1>
                        <ReactMarkdown style={{ fontWeight: "normal" }}>{state.exploreText}</ReactMarkdown>
                    </div>
                </Stack>
            </Stack>
        </Stack>


    );



}

export default OralHistories;