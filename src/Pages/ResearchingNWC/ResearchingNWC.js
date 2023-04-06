import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import qs from 'qs';
import axios from 'axios';
import Map from "./Map";
import './ResearchingNWC.css'
import button from "../../res/button-research-the-nwc.png";
import component119 from './res/component119.png';
import VARIABLES from "../../config/.env.js";

function ResearchingNWC() {

  const [contentMap, setContentMap] = useState([]);

  useEffect(() => {
    async function fetchContentMap() {
      let response = await axios.get(`${VARIABLES.REACT_APP_API_URL}/content-mapping-nwc`);
      setContentMap(response.data.data)
    }
    fetchContentMap();
  },[]);

  // 2nd state to hold map data 
  const [maps, setMap] = useState([]);
  // 3rd state for form search by name
  const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();
  // 4th state for form checkboxes
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  // 5th state form multi-select
  const [selectedOptions, setSelectedOptions] = useState([]);
  const stateObj = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  }

  const stateData = ["TX"]
  const stateOptions = stateData.map(state => {
    return {value: state, label: stateObj[state]}
  })

  const roleData = ["DELEGATES/ALTERNATES","NATIONAL COMMISSIONERS", "NOTABLE SPEAKERS"]
  const roleObj = {
    "DELEGATES/ALTERNATES": ["Delegate at the NWC", "Alternate at the NWC"],
    "NATIONAL COMMISSIONERS": "National Commissioner",
    "NOTABLE SPEAKERS": "Notable Speaker",
  }

  const raceData = ["Black", "Chicana/Chicano", "Latina/Latino","Mexican American", "Native American/American Indian", "Spanish/Hispanic", "white"]
  const religionData = ["Agnostic","Atheist","Baha’i","Catholic","Christian non-Catholic","Eastern Religions","Jewish","Mormon","Muslim","None","Other","Unitarian Universalist"];
  const educationData = ["High School", "College", "Graduate/Professional"]
  const educationObj = {
    "High School": ['some high school','high school diploma'],
    "College": ['some college','college degree'],
    "Graduate/Professional": ['some graduate/professional','graduate/professional degree']
  }
  const politicalOfficeData = ["city level", "county level", "state level", "national level"]
  const politicalPartyData = ["Democratic", "Republican", "Other"]
  const politicalPartyObj = {
    "Democratic": "Democratic Party",
    "Republican": "Republican Party",
    "Other": {$notIn:["Democratic Party", "Republican Party"]}
  }

  // // submit text search query
  async function onSubmitSearch (data) {
    let names = data.searchText.split(" ");
    let query = {}
    names[1] ? query = qs.stringify({
      filters: {
        $and: [
          {first_name: names[0]},
          {last_name: names[1]}
        ]
      }, populate: '*'
    }, {encodeValuesOnly:true}) : query = qs.stringify({
      filters: {
        first_name: names[0]
      }, populate: '*'
    }, {encodeValuesOnly:true})

    const response = await axios.get(`${VARIABLES.REACT_APP_API_URL}/nwc-participants?${query}`);
    setMap(response.data.data);
  }

  // submit basic search query
  async function onSubmit(data) {
    var query_array = [];
    Object.values(data).forEach((value, index) => {
      if (value === true) {
        switch(Object.keys(data)[index].split(' ')[0]){
          case "role":
            query_array.push({ role:{role: roleObj[Object.keys(data)[index].slice(5)]}}); break;
          case 'race':
            query_array.push({ races:{race:Object.keys(data)[index].slice(5)}}); break;
          case 'religion':
            query_array.push({ religion:Object.keys(data)[index].slice(9)}); break;
          case 'education':
            query_array.push({ highest_level_of_education_attained: educationObj[Object.keys(data)[index].slice(10)]}); break;
          case 'level':
            query_array.push({ political_office_helds:{jurisdiction:Object.keys(data)[index].slice(6)}}); break;
          case 'party':
            query_array.push({ political_party_membership:politicalPartyObj[Object.keys(data)[index].slice(6)]}); break;
          default:
            break;
        }
      }
    });
    const query = qs.stringify({
      filters: {
        $or: query_array
      },
      populate: '*',
    }, {
      encodeValuesOnly: true, // prettify URL
    });
    const response = await axios.get(`${VARIABLES.REACT_APP_API_URL}/nwc-participants?${query}`);
    setMap(response.data.data);
  }
  // adding USA list of states for select input
  //reset form fields and map data
  const onClear = () => {
    reset();
    setSelectedOptions(null);
    setMap([])
  }

  // // updates from multi-select
  const onSelect = (options) => {
    setSelectedOptions(options);
  };

  return (
    <div className="mappingNWC">

      {/**BANNER */}
      <div className="mappingNWCBanner">
        <img src={button} className="mappingNWC_button" alt="_" />
        <div className="mappingNWC_card">
          <p>{contentMap?.attributes?.Banner_text}</p>
        </div>
        <div className='mappingNWC_imgcontainer'>
          <img src={component119} className="mappingNWC_component119" alt="_" />
          <div className="mappingNWC_credit" title={contentMap?.attributes?.BannerImageCredit_more}>
            <p>PHOTO BY {contentMap?.attributes?.BannerImage_Credit}</p>
          </div>
        </div>
        
      </div>
      {/**SEARCH */}
      <div className="mappingNWCSearch">
        <h1>HOW TO SEARCH this DATA</h1>
        <hr></hr>
        <h2>BASIC SEARCH</h2>
        <p>{contentMap?.attributes?.Banner_text}</p>

        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form key={2} onSubmit={handleSubmit(onSubmit)} className="basicForm">
          <div className="row">
            <div className='panel'>
              <p>STATE/TERRITORY</p>
              <Select
                isMulti
                options={stateOptions}
                onChange={onSelect}
                value={selectedOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <p>NWC ROLES</p>
              {roleData.map((role, i) => {
                return(
                  <label className="form-control" key={role}>
                    <input type="checkbox" {...register(`role ${role}`)} />{role}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>RACE AND ETHNICITY IDENTIFIERS</p>

              {raceData.map((race, i)=>{
                return(
                  <label className="form-control" key={race}>
                    <input type="checkbox" {...register(`race ${race}`)} />{race}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>RELIGION</p>
              {religionData.map((religion, i)=>{
                return(
                  <label className="form-control" key={religion}>
                    <input type="checkbox" {...register(`religion ${religion}`)} />{religion}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>HIGHEST LEVEL OF EDUCATION</p>
              {educationData.map((education)=>{
                return(
                  <label className="form-control" key={education}>
                    <input type="checkbox" {...register(`education ${education}`)} />{education}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>POLITICAL OFFICES HELD</p>
              {politicalOfficeData.map((office)=>{
                return(
                  <label className="form-control" key={office}>
                    <input type="checkbox" {...register(`level ${office}`)} />{office}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>POLITICAL PARTY MEMBERSHIP</p>
              {politicalPartyData.map((political)=>{
                return(
                  <label className="form-control" key={political}>
                    <input type="checkbox" {...register(`party ${political}`)} />{political}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>EQUAL RIGHTS AMENDMENT STANCE</p>
              <label className="form-control">
                <input type="checkbox" {...register("era_for")} />FOR</label>
              <label className="form-control">
                <input type="checkbox" {...register("era_against")} />AGAINST</label>
            </div>
          </div>
          <div className="row">
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className="row">
            <button type="button" className="resetButton" onClick={onClear}>RESET</button>
            <button type="submit" className="searchButton">SEARCH</button>
          </div>
        </form>

        <div className="nameSearch">
          <p>You can also search participants by name:</p>
          <form key={1} onSubmit={handleSubmitSearch(onSubmitSearch)} className="mappingNWCSearch_bar">
            <input type="text" placeholder="SEARCH" {...registerSearch('searchText', { required: true })} />
            {errorsSearch.searchText?.type === 'required' && "Please enter something for search."}
            <button type="submit" className="mappingNWCSearch_icon"></button>
          </form>
        </div>
      </div>
      {/**MAP */}
      <Map map_data={maps} />

    </div>
  )
}

export default ResearchingNWC
