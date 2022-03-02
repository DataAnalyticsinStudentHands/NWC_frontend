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
  const [currentTab, setCurrentTab] = useState("StudentCollaborators");
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    const leadsData = await axios(
      `${fetchBaseUrl}/content-about-project-leads`
    );
    const contributorsData = await axios(
      `${fetchBaseUrl}/content-about-collaborators`
    );

    setLeads(leadsData.data);
    return contributorsData.data;
  };

  useEffect(() => {
    fetchData().then(blob => {
      //transform the contributors by group
      let grouped = blob.reduce((result, currentValue) => {
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
      <h1 className="meetHead_board">
        MEET OUR TEAM
      </h1>
      <h2>
        PROJECT LEADS
      </h2>
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
          contributors[currentTab].map(c =>
            <div
              className="aboutTable_entry"
              key={Math.random()}
            >
              {c.ProfilePicture ?
                <img src={fetchBaseUrl + c.ProfilePicture.url} alt="_" /> : <img src={empty_profile_image} alt="empty_image_profile" />}
              <div className="aboutTable_alpha">
                <p className="aboutTable_name">{c.Name}</p>
                <p className="aboutTable_txt">{c.Description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
}

export default MeetTheTeam;
