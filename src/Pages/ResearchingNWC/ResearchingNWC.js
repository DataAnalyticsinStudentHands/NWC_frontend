import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import qs from 'qs';
import './ResearchingNWC.css'
import button from "../../assets/res/button-research-the-nwc.png";
import component119 from './res/component119.png';
import progress_map from './res/Map 1.png';
// import BannerCard from "../../Components/BannerCard/BannerCard";
// import CaptionedImg from "../../Components/CaptionedImg/CaptionedImg";

import {ResultTableMap} from './Components/ResultTableMap/ResultTableMap';

import infoIcon from './res/Info Hover Icon.svg';

import { Banner } from '../../Components/Banner';
import { StateSelect } from '../../Components/StateSelect/StateSelect';
import ReactMarkdown from 'react-markdown';
import { processTableData } from './AdvancedSearch/TableHeaders'

function ResearchingNWC() {

  const [contentMap, setContentMap] = useState([]);

  useEffect(() => {
    async function fetchContentMap() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/content-mapping-nwc?populate=*`);
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
  const [userInput, setUserInput] = useState([]);
  // 3rd state for form search by name
  // const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();
  // 4th state for form checkboxes
  const { register, handleSubmit, reset, control} = useForm();
  // 5th state form multi-select
  const [selectedOptions, setSelectedOptions] = useState([]);

  const roleObj = {
    "DELEGATES/ALTERNATES": ["Delegate at the NWC", "Alternate at the NWC"],
    "NATIONAL COMMISSIONERS": ["Ford National Commissioner", "Carter National Commissioner"],
    "NOTABLE SPEAKERS": "Notable Speaker",
  }

const raceObj = {
  "Asian American/Pacific Islander": "Asian American/Pacific Islander",
  "Black": "Black",
  "Hispanic": "Hispanic",
  "Native American/American Indian": "Native American/American Indian",
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
    "Third Party": {
      $notIn:["Democratic Party", "Republican Party"]
    }
  }
  
  // submit basic search query
  async function onSubmit(data) {
    let selectArr = [];
    let query_array = [];
    Object.entries(data).forEach(([key,value], index) => {
      if (value === true) {
        switch(Object.keys(data)[index].split(' ')[0]){
          case "role": {
            const roles = roleObj[Object.keys(data)[index].slice(5)];
            
            if (Array.isArray(roles)) {
              // If roles is an array, push each role individually
              roles.forEach(role => {
                query_array.push({ roles: { role: role } });
                selectArr.push(role);
              });
            } else {
              // If roles is not an array, push the role directly
              query_array.push({ roles: { role: roles } });
              selectArr.push(roles);
            }
            break;
          }
          case 'race':
            query_array.push({basic_races:{race:raceObj[Object.keys(data)[index].slice(5)]}});
            selectArr.push(key.slice(5))
            break;
          case 'religion':
            query_array.push({ religion:religionObj[Object.keys(data)[index].slice(9)]});
            selectArr.push(key.slice(9))
            break;
          case 'education':
            query_array.push({ highest_level_of_education_attained: educationObj[Object.keys(data)[index].slice(10)]});
            selectArr.push(key.slice(10))
            break;
          case 'level':
            query_array.push({ political_office_helds:{jurisdiction:politicalOfficeObj[Object.keys(data)[index].slice(6)]}}); 
            selectArr.push(key.slice(6))
            break;
          case 'party':
            query_array.push({ political_parties:{party: politicalPartyObj[Object.keys(data)[index].slice(6)]}}); 
            selectArr.push(key.slice(6))
            break;
          case 'era_for':
            query_array.push({ planks_fors: {
              plank: 'Equal Rights Amendment Plank'
            }}); 
            selectArr.push('Equal Rights Amendment Plank')
            break;
          case 'era_against':
            query_array.push({ planks_against: {
              plank: 'Equal Rights Amendment Plank'
            }}); 
            selectArr.push('Equal Rights Amendment Plank')
            break;
          default:
            break;
        }
      }
    if (typeof value === 'object') {
      value.forEach(item => {
        query_array.push({represented_state: item.value})
        selectArr.push(item.label)
      })
      
    }
    });
    if(data.participantsName){
      selectArr.push(data.participantsName)
      let names = data.participantsName.split(' ');
      let first_name = names[0];
      let last_name = names[1];
      if(first_name && last_name){
        query_array.push({
          first_name: {
            $startsWithi:first_name
          },
          last_name: {
            $startsWithi:last_name
          }
        });
      } else if(first_name && !last_name){
        query_array.push({
          first_name: {
            $startsWithi:first_name
          }
        });
      } else if(!first_name && last_name){
        query_array.push({
          last_name: {
            $startsWithi:last_name
          }
        });
      } 
    }
    const allCategories = [];
  
    function extractAttributes(obj) {
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        if (key !== 'switch') { // Exclude "switch" from allCategories
          allCategories.push(key);
        }
      });
  
      for (const key of keys) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          extractAttributes(value); // Recursively extract attributes
        }
      }
    }
  
    query_array.forEach((item) => {
      extractAttributes(item);
    });
    const categories = query_array
    .map((item) => {
      const key = Object.keys(item)[0];
      return key !== 'switch' ? key : null; // Exclude "switch" from categories
    })
    .filter((key) => key !== null); // Remove any null values

    setUserInput(selectArr);
    let queryObj = {
      populate: categories,
      sort:[{'last_name':"asc"}],
    }
    data.switch ? queryObj.filters = { $and: query_array } : queryObj.filters = { $or: query_array };

    let query = qs.stringify(queryObj, {encodeValuesOnly: true,});
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
    const tableData = processTableData(response, categories, allCategories, selectArr); // response is API response, newArray
    setTableData(tableData);
  }
  // adding USA list of states for select input
  //reset form fields and map data
  const onClear = () => {
    reset();
    setSelectedOptions([]);
    setMap([])
    setTableData([])
  }

  return (
    <div className="mappingNWC">

      {/* BANNER */}
      <Banner
        imgLeft={button}
        text={contentMap?.attributes?.Banner_text}
        imgRight={component119}
        imgCredit={contentMap?.attributes?.BannerImage_Credit}
      />
        
      {/**SEARCH */}
      <div className="mappingNWCSearch">
        <h1>BASIC SEARCH</h1>
        <hr></hr>
        <h2>HOW TO SEARCH THIS DATA</h2>
        <ReactMarkdown>{contentMap?.attributes?.BasicSearch_Text}</ReactMarkdown>
        <h1>FOLLOW OUR PROGRESS AS WE RELEASE DATA SETS BY STATE AND TERRITORY</h1>
        <img
          src={
            contentMap?.attributes?.BasicSearch_Progress_Map.data
              ? [process.env.REACT_APP_API_URL, contentMap.attributes.BasicSearch_Progress_Map.data.attributes.url].join('')
              : progress_map
          }
          alt="Progress Map"
          className="progress-map"
        />
        <div className='mappingNWCSearchTemp'>Please click boxes below to begin a search.</div>

        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form key={2} onSubmit={handleSubmit(onSubmit)} className="basicForm">
          <div className="row">
            <div className='panel'>
              <p>STATE/TERRITORY</p>
              <Controller
                    control={control}
                    name="represented_state"
                    render={({ field }) => (
                      <StateSelect
                        css={{ container: base => ({ ...base, width: "max-content", minWidth: "11%" })}}
                        onSelect={(selectedOption) => {
                          setSelectedOptions((prevOptions) => ({
                            ...prevOptions,
                            "represented_state": selectedOption,
                          }));

                          field.onChange(selectedOption.map(option => ({
                            label: option.label,
                            value: option.value
                          })));
                        }}
                        selectedOptions={selectedOptions["represented_state"] || []}
                      />
                    )}
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
          <div className="basicSearch_toggle">
              <div className='basicSearch_toggle-left'>
                Narrow search results 
                  <div className='basicSearch_toggle-container'>
                  <img className='infoIcon' src={infoIcon} alt="_" />
                  <div className="basicSearch_toggle-tooltip">
                    <p>
                    <b>Off</b> WIDENS the results to all the participants for whom at least one of the selections are true.
                    </p>
                    <p>
                      Ex: Notable Speakers <strong>OR</strong> Catholic <strong>OR</strong> Republican
                    </p>
                    <p><strong>On</strong> NARROWS  the results list to only the participants for whom all selections are true.</p>
                    <p> Ex: Notable Speakers <strong>AND</strong> Catholic <strong>AND</strong> Republican</p>
                  </div> 
                  </div>
              </div>           
            <label className="basicSearchswitch">
              <input type="checkbox" {...register("switch")}/>
              <span className="slider round"></span>
            </label>
          </div>
          <div className="basicSearch_footer">
            <div className='basicSearch_footer-left'>
              <p>You can also search participants by name:</p>
              <input type="text" placeholder='FirstName LastName' {...register("participantsName")} />
            </div>
            <div className='basicSearch_footer-right'>
              <button type="button" className="resetButton" onClick={onClear}>RESET</button>
              <button type="submit" className="searchButton">SEARCH</button>
            </div>


          </div>
        </form>
      </div>

      {tableData.length >0 ?
        <div className='Result-Continer'>
          <ResultTableMap data={tableData} map_data={maps} userInput={userInput}/>
        </div>
        : <div className='Result-Continer'>
          <p>
            Results will appear here.
          </p>
        </div>
      }

    </div>
  )
}

export default ResearchingNWC
