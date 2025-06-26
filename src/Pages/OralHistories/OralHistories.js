import { useState, useEffect } from 'react'
import video_placeholder from "./res/video_placeholder.png"
import oral_histories_bannerpic from './res/oral_histories_bannerpic.png';
import oral_histories_button from "../../assets/res/button-oral-histories.png";
import bible_women from './res/bible_women.png'
import pro_plan_progress from './res/pro_plan_progress.png'
// import placeholder from './res/placeholder.png'
// import Carousel from './components/Carousel';
// import { ParticipantsTable } from './components/ParticipantsTable';
import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import { Typography } from "../../Components/Typography"
import InfoVideo from "../../Components/Avalon/InfoVideo"
// import { loadcards } from '../Discover/cardloader';

function OralHistories() {

    const [state, setState] = useState({
        bannerText: '',
        imgCredit: '',
        NWC_Means_VideoURL: '',
        meanText: '',
        exploreText: '',

    });
    
    // // const [participants, setParticipants] = useState([])
    // const [roles, setRoles] = useState([]);
    // // states from Discover component
    // const [cards, setCards] = useState([])
    // const [dataLength, setDataLength] = useState()
    // const listOfCards = useRef([]);

    const tabs = [
    "DELEGATES & ALTERNATES",
    "DELEGATES AT LARGE",
    "EXHIBITORS",
    "INTERNATIONAL DIGNITARIES",
    "JOURNALISTS",
    "NATIONAL COMMISSIONERS",
    "NOTABLE SPEAKERS",
    "OBSERVERS",
    "PAID STAFF MEMBERS",
    "TORCH RELAY RUNNERS",
    "VOLUNTEERS",
    ];

    const [activeTab, setActiveTab] = useState('All');



    
    useEffect(() => {
		fetch([process.env.REACT_APP_API_URL, 'api/content-oral-history?populate=*'].join('/'))
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImage_Credit,
                            NWC_Means_VideoURL,
                            What_NWC_Means,
                            ExploreText,
						},
					},
				} = data;
                setState({
                    bannerText: BannerText,
                    imgCredit: BannerImage_Credit,
                    NWC_Means_VideoURL: NWC_Means_VideoURL || video_placeholder,
                    meanText: What_NWC_Means,
                    exploreText: ExploreText,
                  });

			});
        }, [])
    // useEffect(() => {
    //     fetch([process.env.REACT_APP_API_URL, "api/content-discover-stories?sort=lastname&populate=*"].join('/'))
    //         .then((res) => res.json())
    //         .then((data) => {
    //         setParticipants(
    //             data.data
    //             .filter((d) => d.attributes.AvalonUrl !== null || d.attributes.VideoUrl !== null) // Filter out items with null AvalonURL
    //             .map((d) => {
    //                 const name = d.attributes.name;
    //                 const id = d.id;
    //                 const avalonURL = d.attributes.AvalonUrl || video_placeholder
    //                 const state = d.attributes.state;
    //                 const profilepic = d.attributes.profilepic.data ? [process.env.REACT_APP_API_URL, d.attributes.profilepic.data.attributes.url].join(''): placeholder; // Use the imported image
    //                 const featured = d.attributes.featured
    //                 const role = d.attributes.role
    //                 const videoURL =  d.attributes.VideoUrl || video_placeholder
    //                 return [id, name, avalonURL, profilepic, state, featured, role, videoURL];
    //             })
    //         );
    //         })
    //         .catch((err) => console.log(err));
    //     }, []); // eslint-disable-line

        // useEffect(() => {
        // fetch([process.env.REACT_APP_API_URL, "api/nwc-roles?sort=role&populate=*"].join('/'))
        //     .then((res) => res.json())
        //     .then((data) => {
        //     const filteredRoles = data.data
        //     .filter((d) => d.attributes.OralHistory_Role_Toggle === true && !d.attributes.role.includes('Other Role')) //filter for toggle and 'Other Role'
        //     .map((d) => d.attributes.role);
    
        //     // Check if "Other Role" is not already in the array and add it
        //         if (!filteredRoles.includes("Other Role")) {
        //             filteredRoles.push("Other Role");
        //         }
            
        //         setRoles(filteredRoles);
        //         })
        //     .catch((err) => console.log(err));
        // }, []); // eslint-disable-line

        // useEffect(() => {
        //     fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?_limit=-1&populate=*`)
        //       .then(response => response.json())
        //       .then(data => {
        //         loadcards(data.data, setCards);
        //         // setDataLength(data.data.length)
        //         listOfCards.current = data.data
        //       }).catch(err => console.log(err));
        //   }, []); // eslint-disable-line

    return (
        <Stack direction='column' spacing={10}>
            {/* BANNER */}
            <Banner
                imgLeft={oral_histories_button}
                text={state.bannerText}
                imgRight={oral_histories_bannerpic}
                imgCredit={state.imgCredit}
            />
            {/* EXPLORE ORAL HISTORIES */}
            <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                <Stack direction='row' className='item'>
                    <div className="item-right">
                        <Typography type="heading-2" paddingLR="0" paddingTB="0" fontSize="64"> Explore Oral Histories </Typography>
                        <Typography type="paragraph-2" paddingLR="0" fontSize="18"> {state.exploreText} </Typography>
                    </div>
                </Stack>
            </Stack>

            
                <div className="tab-container">
                    {/* Top-Left "All" Button */}
                        <button
                            className={`tab-button all-tab ${activeTab === 'All' ? 'active' : ''}`}
                            onClick={() => setActiveTab('All')}
                        >
                            All
                        </button>
                    {/* Left Tabs */}
                    <div className="tab-column left">
                        {tabs.slice(0, 6).map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button left-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                        ))}
                    </div>

                    {/* Right Tabs */}
                    <div className="tab-column right">
                        {tabs.slice(6).map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button right-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                        ))}
                    </div>
                    </div>

                          <div className="AdvancedSearch_border">  </div>
           { /*
           EXPLORE ORAL HISTORIES 
           <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                    <ParticipantsTable cards={cards} roles={roles} />
            </Stack>
            */}

                        {/* WHAT THE NWC MEANS */}
            <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                <div className="reflection">
                    <Typography type="heading-2" paddingLR="0" paddingTB="0"> Reflections </Typography>
                    <Typography type="paragraph-2" paddingLR="10" paddingTB="1"> {state.meanText} </Typography>
                </div>

                <Stack direction='row' className='item'>
                        <InfoVideo src={state.NWC_Means_VideoURL}/>
                        <InfoVideo src={state.NWC_Means_VideoURL}/>
                </Stack>
            </Stack>

            {/* BANNER 2 */}
            <Stack direction='column' margin={'5% 0 0 0'} className="OralHistories_Voice_container">
                <div className="centered-text">
                    <Typography color="primary.dark.turquoise" type="heading-1">Listening to <br></br> every voice</Typography>
                </div>
                    <Stack direction='row' className='item'>
                        <div className="item-left">
                            <img src={bible_women} alt="minority_rights_plank" />                     
                        </div>
                        <div className="item-right">
                            <img src={pro_plan_progress} alt="minority_rights_plank" />
                            <p>Photos by {state.imgCredit}</p>
                        </div>
                    </Stack>
            </Stack>
        </Stack>
    );
}

export default OralHistories;