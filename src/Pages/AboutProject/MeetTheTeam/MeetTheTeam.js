import { useState, useEffect } from 'react'

import MeetIcon from './MeetIcon';
import "./MeetTheTeam.css";
import empty_profile_image from './res/empty_profile_image.png';

function MeetTheTeam() {
  let contributorsData = ''
  // multiple states to hold the leads and contributors loaded from Strapi
  const [leads, setLeads] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [currentTab, setCurrentTab] = useState("STEERING COMMITTEE");
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    
    fetch([process.env.REACT_APP_API_URL, 'api/content-about-project-leads?_sort=Order:ASC&populate=*'].join('/'))
    .then(res => res.json())
    .then(data => {
        setLeads(data.data)
    })
    .catch(err => console.log(err));
   
  const res = await fetch([process.env.REACT_APP_API_URL, 'api/content-about-collaborators?_sort=LastName:ASC&_limit=-1&populate=*'].join('/'))
  contributorsData = await res.json()

    return contributorsData.data
  };

  const lookup = {
    "StudentCollaborators": 'STUDENT COLLABORATORS',
    "EducatorCollaborators": 'EDUCATOR COLLABORATORS',
    "ContentResearchAssistants": 'CONTENT RESEARCH ASSISTANTS',
    "ContentInterns": 'CONTENT INTERNS',
    "DevUXInterns": 'FULL-STACK DEV AND UX INTERNS',
    "InauguralTeam": 'INAUGURAL TEAM',
    "SteeringCommittee": 'STEERING COMMITTEE',
    "InternalAdvisoryCommittee": 'INTERNAL ADVISORY COMMITTEE',
    "ExternalAdvisoryCommittee": 'EXTERNAL ADVISORY COMMITTEE',
    "DonorGrantingAgencies": 'DONOR AND GRANTING AGENCIES',
    "EditorialBoardFellows": 'EDITORIAL BOARD FELLOWS',
    "EditorialBoardLeads": 'EDITORIAL BOARD LEADS'
  }; 

  useEffect(() => {
    fetchData().then(blob => {

      //transform the contributors by group
      let grouped = blob.map((obj, index )=> ({ ...obj, Contributor_Type: lookup[blob[index].attributes.Contributor_Type] })).reduce((result, currentValue) => {
        (result[currentValue['Contributor_Type']] = result[currentValue['Contributor_Type']] || []).push(
          currentValue
        );
        
        return result
      }, [])
      
      setContributors(grouped);
      setIsLoading(false);
    })
      // make sure to catch any error
      .catch(console.error);
  }, []); // eslint-disable-line
  
  return <div className="meet">
    {/**HEAD */}
    <div className="meetHead">
      <h1>MEET OUR TEAM</h1>
      <h2>PROJECT LEADS</h2>
    </div>

    {/**LEADS */}
    <div className="meetLeads">
      {leads.map((value) => <MeetIcon
        img={process.env.REACT_APP_API_URL + value.attributes.Illustration.data.attributes.url}
        imghover={process.env.REACT_APP_API_URL + value.attributes.Illustration_hover.data.attributes.url}
        name={value.attributes.Name}
        role={value.attributes.Role}
        pfp={process.env.REACT_APP_API_URL + value.attributes.ProfilePicture.data.attributes.url}
        popupText={value.attributes.Description}
        key={value.id}
      />)}
    </div>

    {/**TABLE */}
    <div className="aboutTable">
    <div className="aboutTable_tabs">
    {
      Object.keys(lookup).map(k =>
        <div
          key={k}
          className={`aboutTable_tab ${currentTab === lookup[k] ? 'aboutTable_tab--active' : ''}`}
          onClick={() => setCurrentTab(lookup[k])}
        >
          <p>{lookup[k]}</p>
        </div>
        
      )
    }
  </div>

      <div className="aboutTable_entries">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          contributors[currentTab].map(content =>
            <div className="aboutTable_entry" key={Math.random()}>
              {currentTab !== "STEERING COMMITTEE" && currentTab !== "INAUGURAL TEAM" ? 
              <div className="aboutTable_entry">
                <p className="aboutTable_name"> {content.attributes.FirstName !== 'None' ? content.attributes.FirstName:''} {content.attributes.LastName} - 
                <span className="aboutTable_txt"> {content.attributes.Description}, {content.attributes.Years}</span></p>
              </div> : 
              <div className="aboutTable_steering_entry"> 
                    {content.attributes.ProfilePicture.data ?
                      <img src={process.env.REACT_APP_API_URL + content.attributes.ProfilePicture.data.attributes.url} alt="_" /> : 
                      <img src={empty_profile_image} alt="empty_image_profile"/>}
                    <div className="aboutTable_steering_box">
                      <p className="aboutTable_steering_name"> {content.attributes.FirstName} {content.attributes.LastName}</p>
                      <p className="aboutTable_steering_txt">{content.attributes.Description}</p>
                    </div>
                </div>
              }

            </div>
          )
        )}
      </div>
    </div>
  </div>
}

export default MeetTheTeam;
