import { useState, useEffect } from 'react'
import video_placeholder from "./res/video_placeholder.png"
import oral_histories_bannerpic from './res/oral_histories_bannerpic.png';
import oral_histories_button from "../../assets/res/button-oral-histories.png";
import bible_women from './res/bible_women.png'
import pro_plan_progress from './res/pro_plan_progress.png'

import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import { Typography } from "../../Components/Typography"
import InfoVideo from "../../Components/Avalon/InfoVideo"
import Card from './components/Card'
import { Pagination } from '../ResearchingNWC/Components/Pagination';

//import explore oral history resources
import da_icon from './res/explore/Delegates & Alternates - Nametag.png'
import da_blob from './res/explore/Delegates & Alternates Tab Blob.svg'
import dal_icon from './res/explore/Delegates at Large - US Map.png'
import dal_blob from './res/explore/Delegates at Large Tab Blob.svg'
import exhibitor_icon from './res/explore/Exhibitors - Booth.png'
import exhibitor_blob from './res/explore/Exhibitors Tab Blob.svg'
import dignitaries_icon from './res/explore/International Dignitaries - Globe.png' 
import dignitaries_blob from './res/explore/International Dignitaries Tab blob.svg'
import journalist_icon from './res/explore/Journalists - Newspaper.png'
import journalist_blob from './res/explore/Journalists Tab Blob.svg'
import commissioners_icon from './res/explore/National Commissioners - Gavel.png'
import commissioners_blob from './res/explore/National Commissioners Tab Blob.svg'
import speakers_icon from './res/explore/Notable Speakers - Microphone.png'
import speakers_blob from './res/explore/Notable Speakers Tab Blob.svg'
import observers_icon from './res/explore/Observers - Binoculars.png'
import observers_blob from './res/explore/Observers Tab Blob.svg'
import staff_icon from './res/explore/Paid Staff Members - Clipboard.png'
import staff_blob from './res/explore/Paid Staff Members Tab Blob.svg'
import torch_icon from './res/explore/Torch Relay Runners - Shoes.png'
import torch_blob from './res/explore/Torch Relay Runners Tab Blob.svg'
import volunteers_icon from './res/explore/Volunteers - Helping Hands.png'
import volunteers_blob from './res/explore/Volunteers Tab Blob.svg'


function OralHistories() {

    const [state, setState] = useState({
        bannerText: '',
        imgCredit: '',
        ReflectionsText: '',
        exploreText: '',
        Reflections_VideoURL1: '',
        Reflections_VideoURL2: '',
    });
    

    const tabs = [
        { name: "DELEGATES & ALTERNATES", icon: da_icon, blob: da_blob },
        { name: "DELEGATES AT LARGE", icon: dal_icon, blob: dal_blob },
        { name: "EXHIBITORS", icon: exhibitor_icon, blob: exhibitor_blob },
        { name: "INTERNATIONAL DIGNITARIES", icon: dignitaries_icon, blob: dignitaries_blob },
        { name: "JOURNALISTS", icon: journalist_icon, blob: journalist_blob },
        { name: "NATIONAL COMMISSIONERS", icon: commissioners_icon, blob: commissioners_blob },
        { name: "NOTABLE SPEAKERS", icon: speakers_icon, blob: speakers_blob },
        { name: "OBSERVERS", icon: observers_icon, blob: observers_blob },
        { name: "PAID STAFF MEMBERS", icon: staff_icon, blob: staff_blob },
        { name: "TORCH RELAY RUNNERS", icon: torch_icon, blob: torch_blob },
        { name: "VOLUNTEERS", icon: volunteers_icon, blob: volunteers_blob },
    ];


    const [activeTab, setActiveTab] = useState('All');
    
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?populate=*`)
        .then((res) => res.json())
        .then((data) => {
            const mapped = data.data.map((person) => ({
            name: person.attributes.name,
            role: person.attributes.role,
            description:
                "Collection/Library/Repository Lorem ipsum dolor sit amet...Collection/Library/Repository Lorem ipsum dolor sit amet...Collection/Library/Repository Lorem ipsum dolor sit amet...Collection/Library/Repository Lorem ipsum dolor sit amet...",
            profilepic: person.attributes.profilepic?.data  ? `${process.env.REACT_APP_API_URL}${person.attributes.profilepic.data.attributes.url}` : null,
            }));
            setPeople(mapped);
        });
    }, []);
        
    
    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = people.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(people.length / itemsPerPage);

    const handlePageClick = (selected) => {
    setCurrentPage(selected.selected + 1); // +1 if you want currentPage to be 1-indexed
    };  
    
    useEffect(() => {
		fetch([process.env.REACT_APP_API_URL, 'api/content-oral-history?populate=*'].join('/'))
			.then((res) => res.json())
			.then((data) => {
				const {
					data: {
						attributes: {
							BannerText,
							BannerImage_Credit,
                            ReflectionsText,
                            ExploreText,
                            Reflections_VideoURL1,
                            Reflections_VideoURL2,
						},
					},
				} = data;
                setState({
                    bannerText: BannerText,
                    imgCredit: BannerImage_Credit,
                    ReflectionsText: ReflectionsText,
                    exploreText: ExploreText,
                    Reflections_VideoURL1: Reflections_VideoURL1 || video_placeholder,
                    Reflections_VideoURL2: Reflections_VideoURL2 || video_placeholder,
                  });

			});
        }, [])

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
                key={tab.name}
                className={`tab-button left-tab ${activeTab === tab.name ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.name)}
                >
                <div className="tab-icon-wrapper">
                    <img src={tab.blob} alt={`${tab.name} blob`} className="tab-blob" />
                    <img src={tab.icon} alt={`${tab.name} icon`} className="tab-icon" />
                </div>
                <span className="tab-text">{tab.name}</span>
                </button>
            ))}
            </div>

            {/* Right Tabs */}
            <div className="tab-column right">
            {tabs.slice(6).map((tab) => (
                <button
                key={tab.name}
                className={`tab-button right-tab ${activeTab === tab.name ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.name)}
                >
                <div className="tab-icon-wrapper">
                    <img src={tab.blob} alt={`${tab.name} blob`} className="tab-blob" />
                    <img src={tab.icon} alt={`${tab.name} icon`} className="tab-icon" />
                </div>
                <span className="tab-text">{tab.name}</span>
                </button>
            ))}
            </div>

            <div className="card-grid-container">
                <div className="card-grid">
                    {currentItems.map((p) => (
                    <Card
                        key={p.id}
                        name={p.name}
                        role={p.role}
                        description={p.description}
                        profilepic={p.profilepic}
                    />
                    ))}
                </div>
            <div className="oral-histories-pagination">
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </div>
            </div>
            </div>

            <div className="AdvancedSearch_border">  </div>
           { /*
           EXPLORE ORAL HISTORIES 
           <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                    <ParticipantsTable cards={cards} roles={roles} />
            </Stack>
            */}
            <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                <div className="reflection">
                    <Typography type="heading-2" paddingLR="0" paddingTB="0"> Reflections </Typography>
                    <Typography type="paragraph-2" paddingLR="10" paddingTB="1"> {state.ReflectionsText} </Typography>
                </div>

                <Stack direction='row' className='item'>
                        <InfoVideo src={state.Reflections_VideoURL1}/>
                        <InfoVideo src={state.Reflections_VideoURL2}/>
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