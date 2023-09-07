import React, { useState, useEffect } from 'react'

import oral_histories_bannerpic from './res/oral_histories_bannerpic.png';
import oral_histories_button from "../../assets/res/button-oral-histories.png";
import bible_women from './res/bible_women.png'
import red_dots_decor from './res/red_dots_decor.png'
import blue_dots_decor from './res/blue_dots_decor.png'
import pro_plan_progress from './res/pro_plan_progress.png'

import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import ReactMarkdown from 'react-markdown';

function OralHistories() {

    const [bannerText, setBannerText] = useState("");
	const [imgCredit, setBannerImageCredit] = useState("");
    const [meanText, setMeanText] = useState("");

    useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL_LOCAL}/api/content-oral-history`)
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImage_Credit,
                            What_NWC_Means
						},
					},
				} = data;
				setBannerText(BannerText);
				setBannerImageCredit(BannerImage_Credit);
                setMeanText(What_NWC_Means);
			});
        }, [])


    return (
        <Stack direction='column' spacing={10}>
            {/* BANNER */}
            <Banner
                imgLeft={oral_histories_button}
                text={bannerText}
                imgRight={oral_histories_bannerpic}
                imgCredit={imgCredit}
            />
            {/* WHAT THE NWC MEANS */}
            <Stack direction='column' gap={4} margin={'0 5% 5% 5%'} className="OralHistories_NWC_container">
                <Stack direction='row' className='item'>
                    <div className="item-left">
                        <h1>VIDEO HERE</h1>
                        
                    </div>
                    <div className="item-right">
                        <h1>WHAT THE NWC MEANS TO ME</h1>
                        <ReactMarkdown style={{ fontWeight: "normal" }}>{meanText}</ReactMarkdown>
                    </div>
                </Stack>
            </Stack>

            {/* FEATURED */}
            <Stack direction='column' margin={'0 0 10%'} className="OralHistories_Featured_container">
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

        </Stack>


    );



}

export default OralHistories;