import { useState, useEffect } from 'react'
import video_placeholder from "./res/video_placeholder.png"
import oral_histories_bannerpic from './res/oral_histories_bannerpic.png';
import oral_histories_button from "../../assets/res/button-oral-histories.png";
import bible_women from './res/bible_women.png'
import pro_plan_progress from './res/pro_plan_progress.png'

import { Banner } from "../../Components/Banner";
import { Stack } from "../../Components/Stack";
import { Typography } from "../../Components/Typography"
// import InfoVideo from "../../Components/Avalon/InfoVideo"
import Card from './components/Card'
import { Pagination } from '../ResearchingNWC/Components/Pagination';
import { Search } from '../../Components/SearchBox/Search';
// import { StateSelect } from '../../Components/StateSelect/StateSelect';
import stateTerritories from '../../assets/stateTerritories.json';

//import explore oral history resources
import da_icon from './res/explore/Delegates & Alternates - Nametag.png'
import dal_icon from './res/explore/Delegates at Large - US Map.png'
import exhibitor_icon from './res/explore/Exhibitors - Booth.png'
import dignitaries_icon from './res/explore/International Dignitaries - Globe.png' 
import journalist_icon from './res/explore/Journalists - Newspaper.png'
import commissioners_icon from './res/explore/National Commissioners - Gavel.png'
import speakers_icon from './res/explore/Notable Speakers - Microphone.png'
import observers_icon from './res/explore/Observers - Binoculars.png'
import staff_icon from './res/explore/Paid Staff Members - Clipboard.png'
import torch_icon from './res/explore/Torch Relay Runners - Shoes.png'
import volunteers_icon from './res/explore/Volunteers - Helping Hands.png'
import { ReactComponent as DaBlob } from './res/explore/Delegates & Alternates Tab Blob.svg';
import { ReactComponent as DalBlob } from './res/explore/Delegates at Large Tab Blob.svg';
import { ReactComponent as ExhibitorBlob } from './res/explore/Exhibitors Tab Blob.svg';
import { ReactComponent as DignitariesBlob } from './res/explore/International Dignitaries Tab blob.svg';
import { ReactComponent as JournalistBlob } from './res/explore/Journalists Tab Blob.svg';
import { ReactComponent as CommissionersBlob } from './res/explore/National Commissioners Tab Blob.svg';
import { ReactComponent as SpeakersBlob } from './res/explore/Notable Speakers Tab Blob.svg';
import { ReactComponent as ObserversBlob } from './res/explore/Observers Tab Blob.svg';
import { ReactComponent as StaffBlob } from './res/explore/Paid Staff Members Tab Blob.svg';
import { ReactComponent as TorchBlob } from './res/explore/Torch Relay Runners Tab Blob.svg';
import { ReactComponent as VolunteersBlob } from './res/explore/Volunteers Tab Blob.svg';
import Border1 from './res/explore/Border 1.svg';
import Border2 from './res/explore/Border 2.svg';
import Border3 from './res/explore/Border 3.svg';
import Border4 from './res/explore/Border 4.svg';
import Border5 from './res/explore/Border 5.svg';
import Border6 from './res/explore/Border 6.svg';
import { ReactComponent as Blob1 } from './res/explore/Blob 1.svg';
import { ReactComponent as Blob2 } from './res/explore/Blob 2.svg';
import { ReactComponent as Blob3 } from './res/explore/Blob 3.svg';
import { ReactComponent as Blob4 } from './res/explore/Blob 4.svg';
import { ReactComponent as Blob5 } from './res/explore/Blob 5.svg';
import { ReactComponent as Blob6 } from './res/explore/Blob 6.svg';
import { ReactComponent as Blob7 } from './res/explore/Blob 7.svg';
import { ReactComponent as Blob8 } from './res/explore/Blob 8.svg';
import { ReactComponent as Blob9 } from './res/explore/Blob 9.svg';
import { ReactComponent as Blob10 } from './res/explore/Blob 10.svg';
import { ReactComponent as Blob11 } from './res/explore/Blob 11.svg';

function OralHistories() {

    const [state, setState] = useState({
        bannerText: '',
        imgCredit: '',
        ReflectionsText: '',
        exploreText: '',
        Reflections_VideoURL1: '',
        Reflections_VideoURL2: '',
        state: '',
    });

    const tabs = [
    { name: "DELEGATES & ALTERNATES", icon: da_icon, Blob: DaBlob, activeColor: "#B32525", roles: ["Delegate", "Alternate"] },
    { name: "DELEGATES AT LARGE", icon: dal_icon, Blob: DalBlob, activeColor: "#00779D", roles: ["Delegate-at-Large"] },
    { name: "EXHIBITORS", icon: exhibitor_icon, Blob: ExhibitorBlob, activeColor: "#FFD048", roles: ["Exhibitor"] },
    { name: "INTERNATIONAL DIGNITARIES", icon: dignitaries_icon, Blob: DignitariesBlob, activeColor: "#615FBF", roles: ["International Dignitary"] },
    { name: "JOURNALISTS", icon: journalist_icon, Blob: JournalistBlob, activeColor: "#CB4E28", roles: ["Journalist"] },
    { name: "NATIONAL COMMISSIONERS", icon: commissioners_icon, Blob: CommissionersBlob, activeColor: "#9FC6DF", roles: ["Carter National Commissioner", "Ford National Commissioner"] },
    { name: "NOTABLE SPEAKERS", icon: speakers_icon, Blob: SpeakersBlob, activeColor: "#B32525", roles: ["Notable Speaker"] },
    { name: "OBSERVERS", icon: observers_icon, Blob: ObserversBlob, activeColor: "#00779D", roles: ["Official Observer"] },
    { name: "PAID STAFF MEMBERS", icon: staff_icon, Blob: StaffBlob, activeColor: "#FFD046", roles: ["Paid Staff Member"] },
    { name: "TORCH RELAY RUNNERS", icon: torch_icon, Blob: TorchBlob, activeColor: "#615FBF", roles: ["Torch Relay Runner"] },
    { name: "VOLUNTEERS", icon: volunteers_icon, Blob: VolunteersBlob, activeColor: "#CB4E28", roles: ["Volunteer"] },
    ];

    const borders = [Border1, Border2, Border3, Border4, Border5, Border6];
    const blobs = [Blob1, Blob2, Blob3, Blob4, Blob5, Blob6, Blob7, Blob8, Blob9, Blob10, Blob11];


    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState("");
    const [people, setPeople] = useState([]);
    const [states, setStates] = useState([]);
    const stateNameToCode = Object.values(stateTerritories).reduce((acc, state) => {
        acc[state.state] = state.stateCode;
        return acc;
    }, {});
    // const [selectedStates, setSelectedStates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?populate=*`)
        .then((res) => res.json())
        .then((data) => {
            const mapped = data.data.map((person) => ({
            name: person.attributes.name,
            role: person.attributes.role,
            state: stateNameToCode[person.attributes.state] || null,
            description:
                "Collection/Library/Repository Lorem ipsum dolor sit amet...Collection/Library/Repository",
            profilepic: person.attributes.profilepic?.data  ? `${process.env.REACT_APP_API_URL}${person.attributes.profilepic.data.attributes.url}` : null,
            blobIndex: Math.floor(Math.random() * blobs.length)
            }));
            setPeople(mapped);
        });
    }, []);

    useEffect(() => {
        async function fetchAvailableStates() {
            try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/content-discover-stories?fields=state&pagination[pageSize]=1000`
            );
            const data = await response.json();
            const states = [
                ...new Set(
                    data.data
                        .map((person) =>
                            stateNameToCode[person.attributes.state]
                        )
                        .filter(Boolean)
                )
            ];

            setStates(states);
            } catch (error) {
            console.error("Error fetching available states:", error);
            }
    }

    fetchAvailableStates();
    }, []);
    console.log(states)
    
    const normalize = (str) =>
        str?.trim().toLowerCase();

    const filteredPeople =
        people
            .filter((person) => {
                // TAB FILTER
                if (activeTab === "All") return true;

                const selectedTab = tabs.find(
                    (tab) => tab.name === activeTab
                );

                if (!selectedTab) return false;

                const personRoles = person.role
                    ?.split(",")
                    .map((role) => normalize(role));

                const matchesTab = selectedTab.roles.some((tabRole) =>
                    personRoles?.some(
                        (personRole) =>
                            personRole.includes(normalize(tabRole)) ||
                            normalize(tabRole).includes(personRole)
                    )
                );

                return matchesTab;
            })
        //     .filter((person) => {
        //         // SEARCH FILTER
        //         if (!searchTerm.trim()) return true;

        //         return person.name
        //             ?.toLowerCase()
        //             .includes(searchTerm.toLowerCase());
        //     })
        //             .filter((person) => {
        //         if (selectedStates.length === 0) return true;

        //         const selectedCodes = selectedStates.map(
        //             (s) => s.value
        //         );

        //         return selectedCodes.includes(person.state);
        // });

    const offset = (currentPage - 1) * itemsPerPage;

    const currentItems = filteredPeople.slice(
        offset,
        offset + itemsPerPage
    );

    const pageCount = Math.ceil(filteredPeople.length / itemsPerPage);

    const handlePageClick = (selected) => {
    setCurrentPage(selected.selected + 1); // +1 if you want currentPage to be 1-indexed
    };  

    const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
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
                        onClick={() => handleTabClick('All')}
                    >
                        All
                    </button>
            {/* Left Tabs */}
            <div className="tab-column left">
            {tabs.slice(0, 6).map((tab) => (
                <button
                key={tab.name}
                className={`tab-button left-tab ${activeTab === tab.name ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.name)}
                >
                <div className="tab-icon-wrapper">

                    <tab.Blob
                    className="tab-blob"
                    fill={activeTab === tab.name ? tab.activeColor : "none"}
                    />

                    <img
                    src={tab.icon}
                    alt={`${tab.name} icon`}
                    className="tab-icon"
                    />
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
                onClick={() => handleTabClick(tab.name)}
                >
                <div className="tab-icon-wrapper">

                    <tab.Blob
                    className="tab-blob"
                    fill={activeTab === tab.name ? tab.activeColor : "none"}
                    />

                    <img
                    src={tab.icon}
                    alt={`${tab.name} icon`}
                    className="tab-icon"
                    />
                </div>

                <span className="tab-text">{tab.name}</span>
                </button>
            ))}
            </div>


            <div className="card-grid-container">
                <div className="search-select-container">
                    <Search
                        placeholder="Search by Name"
                        value={searchTerm}
                        onSearch={setSearchTerm}
                        style={{
                                border: "none",
                                padding: "6px",
                                fontSize: "24rem",
                                width: "300px",
                                marginTop: "5%",
                                backgroundColor: "lightgray",
                            }}
                    />
                    {/* <StateSelect
                            selectedOptions={selectedStates}
                            onSelect={setSelectedStates}
                            states={states}   // IMPORTANT: use fetched states here
                            css={{ container: base => ({ ...base, width: "max-content", minWidth: "100%", })}}
                    /> */}
                </div>
                <div className="card-grid">
                {currentItems.map((p, index) => {
                    const border = borders[index % borders.length]; 
                    const randomBlob = blobs[p.blobIndex];
                    
                    //function for match icons with role
                    const getParticipantTab = (personRole) => {
                        const personRoles = personRole
                            ?.split(",")
                            .map((role) => normalize(role));

                        return tabs.find((tab) =>
                            tab.roles.some((tabRole) =>
                                personRoles?.some(
                                    (personRole) =>
                                        personRole.includes(normalize(tabRole)) ||
                                        normalize(tabRole).includes(personRole)
                                )
                            )
                        );
                    };

                    const matchingTab = getParticipantTab(p.role);

                    const icon =
                        activeTab === "All"
                            ? matchingTab?.icon
                            : tabs.find((tab) => tab.name === activeTab)
                                ?.icon;

                    
                    // function for matching colors with role/tab
                    const getParticipantColor = (personRole) => {
                        const personRoles = personRole
                            ?.split(",")
                            .map((role) => normalize(role));

                        const matchingTab = tabs.find((tab) =>
                            tab.roles.some((tabRole) =>
                                personRoles?.includes(normalize(tabRole))
                            )
                        );

                        return matchingTab?.activeColor || "#B32525";
                    };

                    const activeColor =
                        activeTab === "All"
                            ? getParticipantColor(p.role)
                            : tabs.find((tab) => tab.name === activeTab)
                                ?.activeColor;

                                    return (
                                        <Card
                                            key={p.id}
                                            name={p.name}
                                            role={p.role}
                                            description={p.description}
                                            blob={randomBlob}
                                            blobColor={activeColor}
                                            icon={icon} 
                                            borderImage={border} 
                                        />
                                    );
                                })}
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
            {/* <Stack direction='column' gap={4} margin={'5% 5% 5% 5%'} className="OralHistories_NWC_container">
                <div className="reflection">
                    <Typography type="heading-2" paddingLR="0" paddingTB="0"> Reflections </Typography>
                    <Typography type="paragraph-2" paddingLR="10" paddingTB="1"> {state.ReflectionsText} </Typography>
                </div>

                <Stack direction='row' className='item'>
                        <InfoVideo src={state.Reflections_VideoURL1}/>
                        <InfoVideo src={state.Reflections_VideoURL2}/>
                </Stack>
            </Stack> */}

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