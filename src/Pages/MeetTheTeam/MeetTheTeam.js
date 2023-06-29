import React, { useState, useEffect } from 'react'
import MeetIcon from './MeetIcon';
// import axios from 'axios';
import "./MeetTheTeam.css";
// import qs from 'qs'

import empty_profile_image from './res/empty_profile_image.png';

import VARIABLES from "../../config/.env.js";

function MeetTheTeam() {
  const { fetchBaseUrl } = VARIABLES;
  let contributorsData = ''
  // multiple states to hold the leads and contributors loaded from Strapi
  const [leads, setLeads] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [currentTab, setCurrentTab] = useState("STEERING COMMITTEE");
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    // const leadsData = await axios(
    //   `${fetchBaseUrl}/api/content-about-project-leads?_sort=Order:ASC&populate=*`
    // );
    
    fetch([fetchBaseUrl, 'api/content-about-project-leads?_sort=Order:ASC&populate=*'].join('/'))
    .then(res => res.json())
    .then(data => {
        setLeads(data.data)
    })
    .catch(err => console.log(err));

    // const contributorsData = await axios(
    //   `${fetchBaseUrl}/api/content-about-collaborators?_sort=LastName:ASC&_limit=-1&populate=*`
    // );
   
  const res = await fetch([fetchBaseUrl, 'api/content-about-collaborators?_sort=LastName:ASC&_limit=-1&populate=*'].join('/'))
  contributorsData = await res.json()

    return contributorsData.data
    // setLeads(leadsData.data.data);
    // return contributorsData.data.data;
  };


  useEffect(() => {
    fetchData().then(blob => {

      //lookup table for contributor group name
      let lookup = {
        "SteeringCommittee": 'STEERING COMMITTEE',
        "StudentCollaborators": 'STUDENT COLLABORATORS',
        "InternsResearchAssistants": 'INTERNS AND RESEARCH ASSISTANTS',
        "EducatorCollaborators": 'EDUCATOR COLLABORATORS',
        "ExternalAdvisoryCommittee": 'EXTERNAL ADVISORY COMMITTEE',
        "NWCParticipantCommittee": 'NWC PARTICIPANT COMMITTEE',
        "InternalAdvisoryBoard": 'INTERNAL ADVISORY COMMITTEE',
        "DonorGrantingAgencies": 'DONOR AND GRANTING AGENCIES',
        "FormerProjectLeads": 'FORMER PROJECT LEADS'
      } 


      
      
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
        img={fetchBaseUrl + value.attributes.Illustration.data.attributes.url}
        imghover={fetchBaseUrl + value.attributes.Illustration_hover.data.attributes.url}
        name={value.attributes.Name}
        role={value.attributes.Role}
        pfp={fetchBaseUrl + value.attributes.ProfilePicture.data.attributes.url}
        popupText={value.attributes.Description}
        key={value.id}
      />)}
    </div>

    {/**TABLE */}
    <div className="aboutTable">
      <div className="aboutTable_tabs">
        {
          Object.keys(contributors).map(k =>
            <div
              key={Math.random() * Math.random()}
              className={`aboutTable_tab ${currentTab === k ? 'aboutTable_tab--active' : ''}`}
              onClick={e => setCurrentTab(k)}
            >
              <p>{k}</p>
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
              {currentTab !== "STEERING COMMITTEE" ? 
              <div className="aboutTable_entry">
                <p className="aboutTable_name"> {content.attributes.FirstName !== 'None' ? content.attributes.FirstName:''} {content.attributes.LastName} - 
                <span className="aboutTable_txt"> {content.attributes.Description}, {content.attributes.Years}</span></p>
              </div> : 
              <div className="aboutTable_steering_entry"> 
                  {content.attributes.ProfilePicture ?
                      <img src={fetchBaseUrl + content.attributes.ProfilePicture.data.attributes.url} alt="_" /> : 
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
