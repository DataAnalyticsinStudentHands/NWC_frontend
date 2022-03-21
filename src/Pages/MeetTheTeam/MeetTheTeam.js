import React, { useState, useEffect } from 'react'
import MeetIcon from './MeetIcon';
import axios from 'axios';
import "./MeetTheTeam.css";

import empty_profile_image from './res/empty_profile_image.png';

import VARIABLES from "../../config/.env.js";

function MeetTheTeam() {
  const { fetchBaseUrl } = VARIABLES;

  // multiple states to hold the leads and contributors loaded from Strapi
  const [leads, setLeads] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [currentTab, setCurrentTab] = useState("STEERING COMMITTEE");
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    const leadsData = await axios(
      `${fetchBaseUrl}/content-about-project-leads?_sort=Order:ASC`
    );
    const contributorsData = await axios(
      `${fetchBaseUrl}/content-about-collaborators?_sort=LastName:ASC&_limit=-1`
    );

    setLeads(leadsData.data);
    return contributorsData.data;
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
      let grouped = blob.map(obj => ({ ...obj, Contributor_Type: lookup[obj.Contributor_Type] })).reduce((result, currentValue) => {
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
        img={fetchBaseUrl + value.Illustration.url}
        imghover={fetchBaseUrl + value.Illustration_hover.url}
        name={value.Name}
        role={value.Role}
        pfp={fetchBaseUrl + value.ProfilePicture.url}
        popupText={value.Description}
        key={value._id}
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
                <p className="aboutTable_name"> {content.FirstName} {content.LastName} - 
                <span className="aboutTable_txt"> {content.Description}, {content.Years}</span></p>
              </div> : 
              <div className="aboutTable_steering_entry"> 
                  {content.ProfilePicture ?
                      <img src={fetchBaseUrl + content.ProfilePicture.url} alt="_" /> : 
                      <img src={empty_profile_image} alt="empty_image_profile"/>}
                    <div className="aboutTable_steering_box">
                      <p className="aboutTable_steering_name"> {content.FirstName} {content.LastName}</p>
                      <p className="aboutTable_steering_txt">{content.Description}</p>
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
