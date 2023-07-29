import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import qs from 'qs';
import './ResearchingNWC.css'
import button from "../../res/button-research-the-nwc.png";
import component119 from './res/component119.png';

import stateTerritories from '../../assets/stateTerritories.json';

import Search from '../../Components/SearchBox/Search';

import {ResultTableMap} from './Components/ResultTableMap/ResultTableMap';
function ResearchingNWC() {

  const [contentMap, setContentMap] = useState([]);

  useEffect(() => {
    async function fetchContentMap() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/content-mapping-nwc`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setContentMap(data.data);
      } catch (error) {
        console.error('Error fetching content map:', error);
      }
    }
  
    fetchContentMap();
  },[]);

  // 2nd state to hold map data 
  const [maps, setMap] = useState([]);
  const [tableData, setTableData] = useState([]);
  // 3rd state for form search by name
  const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();
  // 4th state for form checkboxes
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  // 5th state form multi-select
  const [selectedOptions, setSelectedOptions] = useState([]);

  const stateOptions = []
  Object.values(stateTerritories).forEach((state) => {
    if (state.isActive) {
      stateOptions.push({value: state.stateCode, label: state.state}) 
    }
  })

  const roleObj = {
    "DELEGATES/ALTERNATES": ["Delegate at the NWC", "Alternate at the NWC"],
    "NATIONAL COMMISSIONERS": ["Ford National Commissioner", "Carter National Commissioner"],
    "NOTABLE SPEAKERS": "Notable Speaker",
  }

const raceObj = {
  "AAPI": "Asian American/Pacific Islander",
  "Black": "Black",
  "Native American/American Indian": "Native American/American Indian",
  "Hispanic": "Hispanic",
  "white": "white"
}
const religionObj = {
  Catholic: "Catholic",
  Jewish: "Jewish",
  Protestant: "Christian non-Catholic",
  None: "None",
  Other: {
    $notIn: ["Catholic", "Jewish", "Christian non-Catholic", "None"]
  },
}

  const educationObj = {
    "High School": ['some high school','high school diploma'],
    "College": ['some college','college degree'],
    "Graduate/Professional": ['some graduate/professional','graduate/professional degree']
  }
const politicalOfficeObj = {
    "City": "city level",
    "County": "county level",
    "State": "state level",
    "Federal": "federal level"
}
  const politicalPartyObj = {
    "Democratic": "Democratic Party",
    "Republican": "Republican Party",
    "Third Part": {
      $notIn:["Democratic Party", "Republican Party"]
    }
  }

  // submit basic search query
  async function onSubmit(data) {
    let query_array = [];
    Object.values(data).forEach((value, index) => {
      if (value === true) {
        switch(Object.keys(data)[index].split(' ')[0]){
          case "role":
            query_array.push({ role:{role: roleObj[Object.keys(data)[index].slice(5)]}}); break;
          case 'race':
            query_array.push({basic_races:{basic_race:raceObj[Object.keys(data)[index].slice(5)]}}); break;
          case 'religion':
            query_array.push({ religion:religionObj[Object.keys(data)[index].slice(9)]}); break;
          case 'education':
            query_array.push({ highest_level_of_education_attained: educationObj[Object.keys(data)[index].slice(10)]}); break;
          case 'level':
            query_array.push({ political_office_helds:{jurisdiction:politicalOfficeObj[Object.keys(data)[index].slice(6)]}}); break;
          case 'party':
            query_array.push({ political_party_membership:politicalPartyObj[Object.keys(data)[index].slice(6)]}); break;
          case 'era_for':
            query_array.push({ planks_fors: {
              plank: 'Equal Rights Amendment Plank'
            }}); break;
          case 'era_against':
            query_array.push({ planks_againsts: {
              plank: 'Equal Rights Amendment Plank'
            }}); break;
          default:
            break;
        }
      }
    });
    const query = qs.stringify({
      filters: {
        $or: query_array,
      },
      populate: ['residence_in_1977','role', 'basic_races'],
      sort:[{'last_name':"asc"}],
    }, {
      encodeValuesOnly: true, // prettify URL
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/nwc-participants?${query}`).then(res => res.json());

    const mapData = response.data.map((person) => {
      return{
        lat:person.attributes.lat,
        lon:person.attributes.lon,
        first_name:person.attributes.first_name,
        last_name:person.attributes.last_name,
      }
    })
    setMap(mapData);
    const tableData = response.data.map((person) => {
      return{
          'Name': `${person.attributes.last_name}, ${person.attributes.first_name} `,
          'Race': person.attributes.basic_races.data.map((race)=> race.attributes.basic_race),
          'Residence in 1977':person.attributes.residence_in_1977.data.attributes.residence_in_1977,
          'Role at NWC':person.attributes.role.data.map((role) => role.attributes.role),
      }
    })
    setTableData(tableData);
  }
  // adding USA list of states for select input
  //reset form fields and map data
  const onClear = () => {
    reset();
    setSelectedOptions(null);
    setMap([])
    setTableData([])
  }

  // // updates from multi-select
  const onSelect = (options) => {
    setSelectedOptions(options);
  };

  async function handleSearch({searchText}) {
    let names = searchText.split(" ");
    let query = {}
    names[1] ? query = qs.stringify({
      filters: {
        $or:[
          {$and: [
            {first_name: {
              $containsi:names[0]
            }},
            {last_name: {
              $containsi:names[1]
            }}
          ]},
          {residence_in_1977:{
            residence_in_1977:{
              $containsi:searchText
            }
          }}
        ]
      }, populate: ['residence_in_1977','role'],
      sort:[{'last_name':"asc"}],
    }, {encodeValuesOnly:true}) : query = qs.stringify({
      filters: {
        $or: [
          {first_name: {
            $containsi:names[0]
          }},
          {last_name: {
            $containsi:names[0]
          }},
          {residence_in_1977:{
            residence_in_1977:{
              $containsi:searchText
            }
          }}
        ]
      }, populate: ['residence_in_1977','role', 'basic_races'],
      sort:[{'last_name':"asc"}],
    }, {encodeValuesOnly:true})

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/nwc-participants?${query}`).then(res => res.json());
    const mapData = response.data.map((person) => {
      return{
        lat:person.attributes.lat,
        lon:person.attributes.lon,
        first_name:person.attributes.first_name,
        last_name:person.attributes.last_name,
      }
    })
    setMap(mapData);
    const tableData = response.data.map((person) => {
      return{
          'Name': `${person.attributes.last_name}, ${person.attributes.first_name} `,
          'Race': person.attributes.basic_races.data.map((race)=> race.attributes.basic_race),
          'Residence in 1977':person.attributes.residence_in_1977.data.attributes.residence_in_1977,
          'Role at NWC':person.attributes.role.data.map((role) => role.attributes.role),
      }
    })
    setTableData(tableData);
  }

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
        <p>{contentMap?.attributes?.BasicSearch_Text}</p>

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
              {Object.keys(roleObj).map((role) => {
                return(
                  <label className="form-control" key={role}>
                    <input type="checkbox" {...register(`role ${role}`)} />{role}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>RACE AND ETHNICITY IDENTIFIERS</p>
              {
                Object.keys(raceObj).map((race)=>{
                  return(
                    <label className="form-control" key={race}>
                      <input type="checkbox" {...register(`race ${race}`)} />{race}
                    </label>
                  )
                })
              }
            </div>
            <div className='panel'>
              <p>RELIGION</p>
              {
                Object.keys(religionObj).map((religion)=>{
                  return(
                    <label className="form-control" key={religion}>
                      <input type="checkbox" {...register(`religion ${religion}`)} />{religion}
                    </label>
                  )
                })
              }
            </div>
            <div className='panel'>
              <p>HIGHEST LEVEL OF EDUCATION</p>
              {Object.keys(educationObj).map((education)=>{
                return(
                  <label className="form-control" key={education}>
                    <input type="checkbox" {...register(`education ${education}`)} />{education}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>POLITICAL OFFICES HELD</p>
              {Object.keys(politicalOfficeObj).map((office)=>{
                return(
                  <label className="form-control" key={office}>
                    <input type="checkbox" {...register(`level ${office}`)} />{office}
                  </label>
                )
              })}
            </div>
            <div className='panel'>
              <p>POLITICAL PARTY MEMBERSHIP</p>
              {Object.keys(politicalPartyObj).map((political)=>{
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

        <Search 
          handleSearch={handleSearch} 
          handleSubmitSearch={handleSubmitSearch} 
          errorsSearch={errorsSearch} 
          registerSearch={registerSearch}
        />
      </div>

      {tableData.length >0 && 
        <div className='Result-Continer'>
          <ResultTableMap data={tableData} map_data={maps}/>
        </div>
      }

    </div>
  )
}

export default ResearchingNWC
