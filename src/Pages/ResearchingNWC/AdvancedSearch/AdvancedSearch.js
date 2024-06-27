import '../ResearchingNWC'
import './AdvancedSearch.css'
import '../ResearchingNWC.css'
import Collapsible from './Collapsible'
import Select from 'react-select';
import { useState, useEffect, } from "react";
import Tabs from "../Components/Tabs";
import { useForm, Controller } from 'react-hook-form';
import qs from 'qs'
import stateTerritories from '../../../assets/stateTerritories.json';
import ReactMarkdown from 'react-markdown';
import '../ResearchingNWC.css'
import {ResultTableMap} from '../Components/ResultTableMap/ResultTableMap';
import { processTableData } from './TableHeaders'
//import { StateSelect } from '../../../Components/StateSelect/StateSelect';
import { Banner } from '../../../Components/Banner';
import JaniceRubin from '../res/JaniceRubin.png'
import button from '../../../assets/res/button-research-the-nwc.png'

function AdvancedSearch() {

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

  // adding USA list of states for select input
  const stateOptions = []
  Object.values(stateTerritories).forEach((state) => {
    if (state.isActive) {
      stateOptions.push({value: state.stateCode, label: state.state}) 
    }
  })

  // const populationOptions = [
  //   { value: "under5000", label: "under 5000" },
  //   { value: "5-20", label: "5,000-20,000" },
  //   { value: "20-50", label: "20,000-50,000" },
  //   { value: "50-100", label: "50,000-100,000" },
  //   { value: "100-500", label: "100,000-500,000" },
  //   { value: "500-1m", label: "500,000-1 million" },
  //   { value: "1million", label: "1 million and over" },
  // ]

  // const incomeOptions = [
  //   { value: "under6000", label: "under $6,000" },
  //   { value: "6000-12000", label: "$6,000-$12,000" },
  //   { value: "$12000", label: "over $12,000" },
  // ]

  // const raceData = ["Black", "Chicana/Chicano", "Latina/Latino","Mexican American", "Native American/American Indian", "Spanish/Hispanic", "white"]
  // const religionData = ["Agnostic","Atheist","Baha’i","Catholic","Christian non-Catholic","Eastern Religions","Jewish","Mormon","Muslim","None","Other","Unitarian Universalist"];
  // const politicalData = ["American Independent Party", "Black Panther Party", "Communist Party USA", "Conservative Party of New York", "DC Statehood Party",
  //                         "Democratic Party", "Liberal Party of New York", "Libertarian Party", "Minnesota Democratic-Farmer-Labor Party", "North Dakota Democratic-Nonpartisan-League Party",
  //                         "Peace and Freedom Party", "Raza Unida Party", "Republican Party", "Socialist Party USA", "Socialist Workers Party", "Other"];
  
  // const religionOptions = religionData.map((option) => {
  //   return {value: option, label: option}
  // }
  // )

  // const politicalOptions = politicalData.map((option) => {
  //   return {value: option, label: option}
  // }
  // )

  // const sexualOrientation = [
  //   { value: "bisexual", label: "Bisexual" },
  //   { value: "heterosexual", label: "Heterosexual" },
  //   { value: "lesbian", label: "Lesbian" },
  // ];
  
  // const [professions, setProfessions] = useState([]);
  
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/api/data-careers?sort=category_of_employment`)
  //     .then(res => res.json())
  //     .then(data => {
  //       const uniqueProfessions = new Set();
  //       data.data.forEach(item => {
  //         uniqueProfessions.add(item.attributes.category_of_employment);
  //       });
  //       setProfessions(
  //         Array.from(uniqueProfessions).map(label => {
  //           return {
  //             value: label,
  //             label: label
  //           };
  //         })
  //       );
  //     })
  //     .catch(err => console.log(err));
  // }, []);
    
    // const [leaderships, setLeaderships] = useState([]);
  
    // useEffect(() => {
    //   fetch(`${process.env.REACT_APP_API_URL}/api/data-leadership-in-organizations?sort=role`)
    //     .then(res => res.json())
    //     .then(data => {
    //       const uniqueLeadership = new Set();
    //       data.data.forEach(item => {
    //         uniqueLeadership.add(item.attributes.role);
    //       });
    //       setLeaderships(
    //         Array.from(uniqueLeadership).map(label => {
    //           return {
    //             value: label,
    //             label: label
    //           };
    //         })
    //       );
    //     })
    //     .catch(err => console.log(err));
    // }, []);

    const [plank, setPlanks] = useState([]);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/nwc-planks?sort=plank`)
        .then(res => res.json())
        .then(data => {
          const uniquePlanks = new Set();
          data.data.forEach(item => {
            uniquePlanks.add(item.attributes.plank);
          });
          setPlanks(
            Array.from(uniquePlanks).map(label => {
              return {
                value: label,
                label: label
              };
            })
          );
        })
        .catch(err => console.log(err));
    }, []); 

    // const [role, setRoles] = useState([])
    const roleCategories = [
      {
        category: "Appointed Positions",
        roles: ["Carter National Commissioner", "Ford National Commissioner", "Delegate-at-Large"]
      },
      {
        category: "Elected Participants",
        roles: ["Alternate at the NWC", "Delegate at the NWC"]
      },
      {
        category: "Observers",
        roles: ["Journalists Covering the NWC", "International Dignitary", "Official Observer", "Unofficial Observer"]
      },
      {
        category: "Other Conference Roles",
        roles: ["Exhibitor", "Notable Speaker", "Torch Relay Runner"]
      },
      {
        category: "Staff & Volunteers",
        roles: ["Paid Staff Member", "Volunteer"]
      },
      {
        category: "State Meetings Information",
        roles: ["Member of State Level IWY Coordinationg Committee", "State Delegation Chair"]
      },
      {
        category: "NWC Caucuses",
        roles: ["American Indian and Alaskan Native Women's Caucus", "Arts Caucus", "Asian and Pacific Women's Caucus", 
                "Chicana Caucus", "Disabled Women's Caucus", "Farm Women Caucus", "Hispanic Caucus", "Jewish Women's Caucus",
                "Lesbian Caucus", "Minority Women's Caucus", "National Congress of Neighborhood Women Caucus", "Peace Caucus",
                "Pro-Plan Caucus", "Puerto Rican Caucus", "Sex and Poverty IWY Poor and Low-Income Women's Caucus", "Wellfare Caucus",
                "Women in Sports Caucus", "Youth Caucus"
                ]
      },
    ];

    // useEffect(() => {
    //   fetch(`${process.env.REACT_APP_API_URL}/api/nwc-roles?sort=role&filters[role][$notContainsi]=Other Role`)
    //     .then(res => res.json())
    //     .then(data => {
    //       const roles = data.data.map(item => item.attributes.role);
    //       setRoles(
    //         roles.map(label => {
    //           return {
    //             value: label,
    //             label: label
    //           };
    //         })
    //       );
    //     })
    //     .catch(err => console.log(err));
    // }, []);

  const {
    register, 
    handleSubmit,
    reset,
    control,
  } = useForm()

  const [maps, setMap] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [isButtonClicked, setIsButtonClicked] = useState(false); // state used to display chart
  const [ageCheckboxState, setAgeCheckboxState] = useState({
    age1to39: false,
    age40to64: false,
    age65plus: false,
  });
  const [userInput, setUserInput] = useState([])

  // const handleAgeCheckboxChange = (name, checked) => {
  //   setAgeCheckboxState({
  //     ...ageCheckboxState,
  //     [name]: checked,
  //   });
  // };

  async function onSubmit(data) {
    let array_query = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== false && typeof value === 'object') {
        const filteredValue = filterEmptyStringsInNestedStructure(value);
        if (Object.keys(filteredValue).length > 0) {
          const newObj = { [key]: filteredValue };
          array_query.push(newObj);
        }
      }
      else if (value !== undefined && value !== false){
        const newObj = { [key]: value };
        array_query.push(newObj)
      }
    });

    function filterEmptyStringsInNestedStructure(obj) {
      const filteredObj = {};
    
      for (const prop in obj) {
        if (typeof obj[prop] === 'object') {
          const filteredNested = filterEmptyStringsInNestedStructure(obj[prop]);
    
          if (Object.keys(filteredNested).length > 0) {
            filteredObj[prop] = filteredNested;
          }
        } else if (obj[prop] !== '' && obj[prop] !== undefined && obj[prop] !== false) {
          filteredObj[prop] = obj[prop];
        }
      }
      return filteredObj;
    }
    //checks age ranges
    if (ageCheckboxState.age40to64) {
      const ageRangeQuery = {
        $gte: 40,
        $lte: 64,
      };
      array_query.push({ 'age_in_1977': ageRangeQuery });
    }

    // Handle the '1-39' checkbox
    if (ageCheckboxState.age1to39) {
      const ageRangeQuery = {
        $gte: 1,
        $lte: 39,
      };
      array_query.push({ 'age_in_1977': ageRangeQuery });
    }

    // Handle the '65+' checkbox
    if (ageCheckboxState.age65plus) {
      const ageRangeQuery = {
        $gte: 65,
      };
      array_query.push({ 'age_in_1977': ageRangeQuery });
    }
    
    const allCategories = [];
    function extractAttributes(obj) { //gets list of all categories (incl. ones that dont have a name)
      const keys = Object.keys(obj);
      allCategories.push(...keys);

      for (const key of keys) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          // If the value is an object (nested attribute), recursively extract its attributes
          extractAttributes(value);
        }
      }
    }
    array_query.forEach((item) => {
      extractAttributes(item);
    });

    const categories = array_query.map((item) => { //grabs categories with a proper name
      const key = Object.keys(item)[0];
      return key
    })
    const allValues = [];
    for (const item of array_query) {
      const key = Object.keys(item)[0];
      const value = item[key];
    
      if (typeof value === 'object') {
        for (const nestedKey of Object.keys(value)) {
          const nestedValue = value[nestedKey];
          if (typeof nestedValue === 'object') {
            for (const deeplyNestedValue of Object.values(nestedValue)) {
              allValues.push(deeplyNestedValue);
            }
          } else {
            allValues.push(nestedValue);
          }
        }
      } else {
        let transformedValue = value;
        if (value === "true") {
          transformedValue = "yes";
        } else if (value === "false") {
          transformedValue = "no";
        }
        const transformedKey = key.replace(/_/g, " ");
        allValues.push(`${transformedKey}: ${transformedValue}`);
      }
    }
    setUserInput(allValues);

    const query = qs.stringify({
      filters: {
        $or: array_query,
      },
      populate: categories,

    }, {
      encodeValuesOnly: true, // prettify URL
    });

    if (array_query.length === 0) {
      alert('No search input')
    }
    else {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/nwc-participants?${query}`).then(res => res.json());
    
    if (response.data.length === 0) {
      setIsButtonClicked(true);

    }
    else {
      const mapData = response.data.map((person) => {
        return{
          lat:person.attributes.lat,
          lon:person.attributes.lon,
          first_name:person.attributes.first_name,
          last_name:person.attributes.last_name,
        }
      })
      setMap(mapData);

      const tableData = processTableData(response, categories, allCategories); //response is API response, newArray

      setTableData(tableData);
      setIsButtonClicked(true);
      }
    }
 }
  //Reset funnction for button
  const clearForm = () => {
    setTimeout(() => {
    reset();
    setSelectedOptions({ represented_state: null }); // Reset the StateSelect component
    setTableData([])
    setMap([])
    setIsButtonClicked(false);
    setAgeCheckboxState({
      age1to39: false,
      age40to64: false,
      age65plus: false,
    });
    }, 50)
  }
  const [selectedOptions, setSelectedOptions] = useState({});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Banner
        imgLeft={button}
        text={contentMap?.attributes?.Banner_text}
        imgRight={JaniceRubin}
        imgCredit={contentMap?.attributes?.BannerImage_Credit}
      />
    <div className="advancedSearch_font">
      <div className="advancedSearch">
        <div className="advancedSearch_text">
          <h1> Cross-referenced search </h1>
          <hr></hr>
          <h2> Advanced Search </h2>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Banner}</ReactMarkdown>
        </div>
      </div>
        <div  className="advancedSearch"> 
        <Tabs> 
            <div label="NWC Participation">
            <div className="advancedSearch_form">
                <h1> Role AT NWC <br></br> Select One or More Roles: </h1>
                <div className="item_Collapsible">

                {roleCategories.map((category, index) => (
                  <Collapsible label={category.category} key={index}>
                        {category.roles.map((role, index) => {
                          return (
                            <label className="advancedSearch_form-control" key={index}>
                              <input type="checkbox" value={role} {...register("role.role")} />
                              {role}
                            </label>
                          );
                          })}
                              {/* <label className="advancedSearch_form-control">
                              <input type="checkbox" value="Other Role" {...register("role.role[$containsi]")} />
                              Other
                            </label> */}
                  </Collapsible>
                  
                ))}
                </div>
                <div className="advancedSearch_container">
                <h1> Position Planks <br></br> Select One or More Planks: </h1>
                
                <div className="item_NWC">
                {plank.map((role, index) => {
                  return (
                    <label className="advancedSearch_form-control" key={index}>
                      <input type="checkbox" value={role.value} {...register("role.role")} />
                      {role.label}
                    </label>
                  );
                  })}
                      {/* <label className="advancedSearch_form-control">
                      <input type="checkbox" value="Other Role" {...register("role.role[$containsi]")} />
                      Other
                    </label> */}
                    </div> 
                </div>
              </div>
            </div>    
            <div label="Participant Demographics">
            <div className="advancedSearch_form">
              <div className="advancedSearch_container">
                <h1> Select a plank: </h1>
                <div className="item_EDU">
                  <div className="advancedSearch_form-control">
                    <Controller
                      control={control}
                      render={({ field }) => (
                        <Select
                        styles={{
                          container: base => ({ ...base, width: "max-content",minWidth: "11%"})   
                        }}
                          options={plank}
                          onChange={(selectedOption) => {
                            setSelectedOptions((prevOptions) => ({
                              ...prevOptions,
                              plank: selectedOption.value,
                            }));
                            field.onChange(selectedOption.value);
                            reset({ planks_fors: { plank: false }, planks_againsts: { plank: false }, planks_spoke_fors: { plank: false } }); // Reset checkbox values
                          }}
                          onBlur={field.onBlur}
                          value={selectedOptions.plank ? plank.find((option) => option.value === selectedOptions.plank) : null }
                          placeholder="Select..."
                          ref={field.ref}
                        />
                      )}/>
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                {selectedOptions.plank && (
                  <>
                    <h1>position (required) </h1>
                    <div className="item">
                      <label className="advancedSearch_form-control">
                        <input type="checkbox" value={selectedOptions.plank} {...register("planks_fors.plank")}/>
                        for
                      </label>
                      <label className="advancedSearch_form-control"> 
                      <input type="checkbox" value={selectedOptions.plank} {...register("planks_againsts.plank")}/>
                        against
                      </label>
                      <label className="advancedSearch_form-control">
                        <input type="checkbox" value={selectedOptions.plank} {...register("planks_spoke_fors.plank")} />
                        spoke for
                      </label>
                    </div>
                    
                  </>
                )}
              </div>
            </div>
            </div>  
            <div label="Education & Career">
              </div> 
            <div label="Electoral Politics">
            </div> 
            <div label="Organizations">
            </div> 
          </Tabs>
          </div>
        <div className="advancedSearch"> 
        <div style={{border: "none", marginBottom: "50rem"}} className="advancedSearch_bar_container">
          <button type="reset" className="advancedSearch_button_reset" onClick={clearForm}> Reset </button>
          <button type="submit" className="advancedSearch_button_search"> Search </button>

        </div>
        </div>
        {isButtonClicked && tableData.length > 0 && (
        <div className='Result-Continer'>
          <ResultTableMap data={tableData} map_data={maps} userInput={userInput}/>
        </div>
        )}
        {isButtonClicked && tableData.length === 0 && (
          <div style={{textAlign: "center", marginBottom: "50rem"}}> 
         <p> No results found </p>
         </div>
        )} 
      <div className="AdvancedSearch_border">  </div>
      <div className="advancedSearch">
        <div className="advancedSearch_text">
          <h1> Open Text search </h1>
          <hr></hr>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Banner}</ReactMarkdown>
        </div>
        
      </div>
      <div className="advancedSearch_bar_container">
        <div className="advancedSearch_bar">
            <input type="text" placeholder="SEARCH"/>
        </div>
      </div> 
      </div>
      </form>
      
  )
}

export default AdvancedSearch