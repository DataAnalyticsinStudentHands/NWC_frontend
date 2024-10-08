import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import qs from "qs";

import htcBannerPic from "./res/htcBannerPic.png";
import archivists_button from "./res/archivists_button.png";
import researcher_button from "./res/researcher_button.png";
import educators_button from "./res/educators_button.png";
import students_button from "./res/students_button.png";
import nwc_button from "./res/nwc_participants_button.png";
import how_to_contribute_button from "../../assets/res/button-how-to-contribute.png";

import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import ReactMarkdown from 'react-markdown';

const IconObj = {
    'researchers': researcher_button,
    'archivists': archivists_button,
    'nwc participants': nwc_button,
    'educators': educators_button,
    'students': students_button,
}
function HowToContribute() {
	const [bannerText, setBannerText] = useState("");
    const [SubmissionsText, setSubmissionsText] = useState("");
	const [imgCredit, setBannerImageCredit] = useState("");

	const [involvedData, setInvolvedData] = useState({});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/content-how-to-contribute`)
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImageCredit,
                            SubmissionsText
						},
					},
				} = data;
				setBannerText(BannerText);
                setSubmissionsText(SubmissionsText);
				setBannerImageCredit(BannerImageCredit);
			});
        const resourceQuery = qs.stringify({
            fields: ['resource', 'summary_text'],
            populate: ['resource_icon'],
            sort: 'id'
        }, { encodeValuesOnly: true })
        fetch(`${process.env.REACT_APP_API_URL}/api/content-how-to-contribute-resources?${resourceQuery}`)
            .then((res) => res.json())
            .then((data) => {
                let dataObj = {};
                data.data.forEach((item) => {
                    let imgUrl = ''
                    item.attributes.resource_icon.data 
                    ? imgUrl = `${process.env.REACT_APP_API_URL}${item.attributes.resource_icon.data.attributes.url}`
                    : imgUrl = IconObj[item.attributes.resource.toLowerCase()] || null
                    
                    dataObj[item.attributes.resource] = {
                        title: item.attributes.resource,
                        text: item.attributes.summary_text,
                        img: imgUrl
                    }
                })
                setInvolvedData(dataObj);
            })
	}, []);
	return (
        <Stack direction='column' spacing={10}>
			<Banner
				imgLeft={how_to_contribute_button}
				text={bannerText}
				imgRight={htcBannerPic}
				imgCredit={imgCredit}
			/>

            <Stack direction='column' gap={4} margin={'0 10%'} className="howToContribute_Involved_container">
                <h1>HOW TO GET INVOLVED</h1>

                {Object.keys(involvedData).map((key, i) => {
                    const { title, text, img } = involvedData[key];
                    return (
                        <Stack direction='row' className='item' key={i}>
                            <div className="item-left">
                                <img src={img} alt="_"></img>
                            </div>
                            <div className="itemr-ight">
                                <Link to={key}>{title}</Link>
                                <ReactMarkdown>{text}</ReactMarkdown>
                            </div>
                        </Stack>
                    );
                })}
            </Stack>

            <div className="howToContribute_Submission_container">
                <h1>SUBMISSIONS</h1>
                <p>{SubmissionsText}</p>
                <div>
                    <Link to="/forms/contactus">
                        Contact us
                    </Link>
                    <Link to="/forms/moreideas">
                        Have more ideas? Tell us here
                    </Link>
                </div>
            </div>
        </Stack>
	);
}
export default HowToContribute;