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
import CassetteCard from './components/Cassette'
import { Pagination } from '../ResearchingNWC/Components/Pagination';
// import { loadcards } from '../Discover/cardloader';

function OralHistories() {

    const [state, setState] = useState({
        bannerText: '',
        imgCredit: '',
        NWC_Means_VideoURL: '',
        meanText: '',
        exploreText: '',
        Reflections_VideoURL1: '',
        Reflections_VideoURL2: '',
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
    
    const [people, setPeople] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?populate=*`)
        .then((res) => res.json())
        .then((data) => {
            const mapped = data.data.map((person) => ({
            name: person.attributes.name,
            role: person.attributes.role,
            description:
                "Collection/Library/Repository Lorem ipsum dolor sit amet...",
            }));
            setPeople(mapped);
        });
    }, []);
        
    
  const offset = currentPage * itemsPerPage;
  const currentItems = people.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(people.length / itemsPerPage);

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
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
                            NWC_Means_VideoURL,
                            What_NWC_Means,
                            ExploreText,
                            Reflections_VideoURL1,
                            Reflections_VideoURL2,
						},
					},
				} = data;
                setState({
                    bannerText: BannerText,
                    imgCredit: BannerImage_Credit,
                    NWC_Means_VideoURL: NWC_Means_VideoURL || video_placeholder,
                    meanText: What_NWC_Means,
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
                        <div className="cassette-grid-container">
                            <div className="cassette-grid">
                                {currentItems.map((p) => (
                                <CassetteCard
                                    key={p.id}
                                    name={p.name}
                                    role={p.role}
                                    description={p.description}
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

                        {/* WHAT THE NWC MEANS */}
            <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                <div className="reflection">
                    <Typography type="heading-2" paddingLR="0" paddingTB="0"> Reflections </Typography>
                    <Typography type="paragraph-2" paddingLR="10" paddingTB="1"> {state.meanText} </Typography>
                </div>

                <Stack direction='row' className='item'>
                        <InfoVideo src={state.Reflections_VideoURL1}/>
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