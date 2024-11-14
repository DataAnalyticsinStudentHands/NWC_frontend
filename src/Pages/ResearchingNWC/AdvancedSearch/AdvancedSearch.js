import '../ResearchingNWC'
import './AdvancedSearch.css'
import '../ResearchingNWC.css'
import Collapsible from './Collapsible'
import Select, { components } from 'react-select';
import { useState, useEffect, } from "react";
import Tabs from "../Components/Tabs";
import { useForm, Controller } from 'react-hook-form';
import qs from 'qs'
import stateTerritories from '../../../assets/stateTerritories.json';
import ReactMarkdown from 'react-markdown';
import '../ResearchingNWC.css'
import {ResultTableMap} from '../Components/ResultTableMap/ResultTableMap';
import { processTableData } from './TableHeaders'
import { StateSelect } from '../../../Components/StateSelect/StateSelect';
import { Banner } from '../../../Components/Banner';
import { InfoBox } from '../Components/InfoBox';
import infoIcon from '../res/Info Hover Icon.svg';
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

  const populationOptions = [
    { value: "1 - 2,500", label: "1 - 2,500", filter: { $gte: 1, $lte: 2500 }},
    { value: "2,501 - 49,999", label: "2,501 - 49,999", filter: { $gte: 2501, $lte: 49999 }},
    { value: "50,000+", label: "50,000+", filter: { $gte: 50000 }},

  ]

  const incomeOptions = [
    { value: "$0 - $10,000", label: "$0 - $10,000", filter: { $gte: '0', $lte: 10000 }},
    { value: "$10,001 - $15,000", label: "$10,001 - $15,000", filter: { $gte: 10001, $lte: 15000 }},
    { value: "$15,001+", label: "$15,001+", filter: { $gte: 15001 }},
  ]

  const decadeOptions = [
    { value: "Before 1977", label: "Before 1977", filter: { $lt: 1977 }},
    { value: "After 1977", label: "After 1977", filter : { $gt: 1977 }},
    { value: "1900 - 1909", label: "1900 - 1909", filter : { $gte: 1900, $lte: 1909 }},
    { value: "1910 - 1919", label: "1910 - 1919", filter : { $gte: 1909, $lte: 1919 }},
    { value: "1920 - 1929", label: "1920 - 1929", filter : { $gte: 1920, $lte: 1929 }},
    { value: "1930 - 1939", label: "1930 - 1939", filter : { $gte: 1930, $lte: 1939 }},
    { value: "1940 - 1949", label: "1940 - 1949", filter : { $gte: 1940, $lte: 1949 }},
    { value: "1950 - 1959", label: "1950 - 1959", filter : { $gte: 1950, $lte: 1959 }},
    { value: "1960 - 1969", label: "1960 - 1969", filter : { $gte: 1960, $lte: 1969 }},
    { value: "1970 - 1977", label: "1970 - 1977", filter : { $gte: 1970, $lte: 1977 }},
  ]

  const religionData = ["Agnostic","Atheist","Baha’i","Catholic","Eastern Religions","Jewish","Mormon","Muslim","None","Other", "Protestant", "Unitarian Universalist"];
  const politicalData = ["American Independent Party", "Black Panther Party", "Communist Party USA", "Conservative Party of New York", "DC Statehood Party",
                          "Democratic Party", "Liberal Party of New York", "Libertarian Party", "Minnesota Democratic-Farmer-Labor Party", "North Dakota Democratic-Nonpartisan-League Party",
                          "Peace and Freedom Party", "Raza Unida Party", "Republican Party", "Socialist Party USA", "Socialist Workers Party", "Other"];
  
  const religionOptions = religionData.map((option) => {
    return {value: option, label: option}
  }
  )

  const politicalOptions = politicalData.map((option) => {
    return {value: option, label: option}
  }
  )

  const sexualOrientation = [
    { value: "bisexual", label: "Bisexual" },
    { value: "heterosexual", label: "Heterosexual" },
    { value: "lesbian", label: "Lesbian" },
  ];
  
  const [professions, setProfessions] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/data-careers?sort=category_of_employment`)
      .then(res => res.json())
      .then(data => {
        const uniqueProfessions = new Set();
        data.data.forEach(item => {
          uniqueProfessions.add(item.attributes.category_of_employment);
        });
        setProfessions(
          Array.from(uniqueProfessions).map(label => {
            return {
              value: label,
              label: label
            };
          })
        );
      })
      .catch(err => console.log(err));
  }, []);
    
    const [leaderships, setLeaderships] = useState([]);
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/data-leadership-in-organizations?sort=role`)
        .then(res => res.json())
        .then(data => {
          const uniqueLeadership = new Set();
          data.data.forEach(item => {
            uniqueLeadership.add(item.attributes.role);
          });
          setLeaderships(
            Array.from(uniqueLeadership).map(label => {
              return {
                value: label,
                label: label
              };
            })
          );
        })
        .catch(err => console.log(err));
    }, []);

    const [plank, setPlanks] = useState([]);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/data-planks?sort=plank`)
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

    const [clickedPlanks, setclickedPlanks] = useState({});

    const handleCheckboxClick = (plank) => {
      setclickedPlanks((prev) => ({
        ...prev,
        [plank]: !prev[plank],
      }));
    };

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
        roles: ["American Indian and Alaskan Native Women’s Caucus", "Arts Caucus", "Asian and Pacific Women’s Caucus", 
                "Chicana Caucus", "Disabled Women’s Caucus", "Farm Women Caucus", "Hispanic Caucus", "Indian Women’s", "Jewish Women’s Caucus",
                "Lesbian Caucus", "Minority Women’s Caucus", "National Congress of Neighborhood Women Caucus", "Peace Caucus",
                "Pro-Plan Caucus", "Puerto Rican Caucus", "Sex and Poverty IWY Poor and Low-Income Women’s Caucus", "Wellfare Caucus",
                "Women in Sports Caucus", "Youth Caucus"
                ]
      },
    ];

    const race_ethnicity = [
      {
        race: "Asian American/Pacific Islander",
        identities: ["American Samoan", "Asian American", "Cambodian", "Chamorro", "Chinese", "Filipino", "Guamanian", "Indian", "Japanese", 
                    "Korean"," Malaysian", "Marshallese", "Micronesian", "Native Hawaiian", "Pacific Islander", "Pakistani", "Polynesian", "South Asian", "Thai", "Vietnamese"]
      },
      {
        race: "Black",
        identities: ["African", "African American", "Afro-Caribbean", "Afro-Latina/Latino", "Black"]
      },
      {
        race: "Hispanic",
        identities: ["Chicana/Chicano", "Cuban", "Latina/Latin", "Latinx","Mexican", "Mexican American", "Other Hispanic", "Puerto Rican", "Spanish/Hispanic"]
      },
      {
        race: "Middle Eastern",
        identities: ["Arab", "Israeli", "Persian"]
      },
      {
        race: "Native American/American Indian",
        identities: ["Alaska Native", "Choctaw", "First Nations", "Huichol", "Indigenous", "Native American/American Indian"]
      },
      {
        race: "White",
        identities: ["Albanian", "Czech", "Dutch", "English", "French", "German", "Greek", "Hungarian", "Irish", "Italian", "Jewish", "Polish", "Portuguese", "Russian",
                      "Ruthenian", "Scotch", "Slavic", "Spanish", "Ukrainian", "Welch", "white"]  
      },

    ]

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
  const [hasChildren, setHasChildren] = useState(null)
  const [isButtonClicked, setIsButtonClicked] = useState(false); // state used to display chart
  const [ageCheckboxState, setAgeCheckboxState] = useState({
    age16to25: false,
    age26to55: false,
    age56plus: false,
  });
  const [childrenCheckboxState, setchildrenCheckboxState] = useState({
    children_12: false,
    children_34: false,
    children5: false,
  });
  const [userInput, setUserInput] = useState([])

  const handleAgeCheckboxChange = (name, checked) => {
    setAgeCheckboxState({
      ...ageCheckboxState,
      [name]: checked,
    });
  };

  const handleChildrenCheckbox = (name, checked) => {
    setchildrenCheckboxState({
      ...childrenCheckboxState,
      [name]: checked,
    });
  }
  async function onSubmit(data) {
    let array_query = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== false && typeof value === 'object') {
        const filteredValue = filterEmptyStringsAndTimestamps(value);
        if (Object.keys(filteredValue).length > 0) {
          const newObj = { [key]: filteredValue };
          array_query.push(newObj);
        }
      } else if (value !== undefined && value !== false){
        const newObj = { [key]: value };
        array_query.push(newObj);
      }
    });
  
    array_query = array_query.filter(item => Object.keys(item)[0] !== 'switch');
  
    function filterEmptyStringsAndTimestamps(obj) {
      const filteredObj = {};
  
      for (const prop in obj) {
        if (prop === 'createdAt' || prop === 'updatedAt') continue; // Skip these attributes
  
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          const filteredNested = filterEmptyStringsAndTimestamps(obj[prop]);
          if (Object.keys(filteredNested).length > 0) {
            filteredObj[prop] = filteredNested;
          }
        } else if (obj[prop] !== '' && obj[prop] !== undefined && obj[prop] !== false) {
          filteredObj[prop] = obj[prop];
        }
      }
      return filteredObj;
    }
  
    // Checks age ranges
    if (ageCheckboxState.age16to25) {
      array_query.push({ 'age_in_1977': { $gte: 16, $lte: 25 } });
    }
  
    if (ageCheckboxState.age26to55) {
      array_query.push({ 'age_in_1977': { $gte: 26, $lte: 55 } });
    }
  
    if (ageCheckboxState.age56plus) {
      array_query.push({ 'age_in_1977': { $gte: 56 } });
    }
  
    if (childrenCheckboxState.children_12) {
      array_query.push({ 'total_number_of_children': { $gte: 1, $lte: 2 } });
    }
  
    if (childrenCheckboxState.children_34) {
      array_query.push({ 'total_number_of_children': { $gte: 3, $lte: 4 } });
    }
  
    if (childrenCheckboxState.children5) {
      array_query.push({ 'total_number_of_children': { $gte: 5 } });
    }
    if (selectedOptions.population) {
      const selectedOption = populationOptions.find(option => option.value === selectedOptions.population);
      
      if (selectedOption) {
        array_query.push({ residence_in_1977s: { total_population: selectedOption.filter } });
      }
    }
    
    if (selectedOptions.income) {
      const selectedOption = incomeOptions.find(option => option.value === selectedOptions.income);
      
      if (selectedOption) {
        array_query.push({ residence_in_1977s: { median_household_income: selectedOption.filter } });
      }
    }
  
    if (selectedOptions.decade && selectedOptions.decade.length > 0) {
      selectedOptions.decade.forEach(option => {
        array_query.push({ political_office_helds: { start_year: option.filter }});
      });
    }

    if (selectedOptions.decadeEDU && selectedOptions.decadeEDU.length > 0) {
      selectedOptions.decadeEDU.forEach(option => {
        array_query.push({ educations: { year: option.filter }});
      });
    }
  
    if (selectedOptions.races) {
      // Remove any existing races object from array_query
      array_query = array_query.filter(item => !item.races);
      
      data.races = {};
      const values = Object.keys(selectedOptions.races).reduce((acc, race) => {
        const values = selectedOptions.races[race].map(item => item.value);
        return acc.concat(values);
      }, []);
      array_query.push({ races: { race: values } });
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
  
    array_query.forEach((item) => {
      extractAttributes(item);
    });
  
    const categories = array_query
      .map((item) => {
        const key = Object.keys(item)[0];
        return key !== 'switch' ? key : null; // Exclude "switch" from categories
      })
      .filter((key) => key !== null); // Remove any null values
    const allValues = [];
  
    for (const item of array_query) {
      const key = Object.keys(item)[0];
      const value = item[key];
      if (typeof value === 'object') {
        // Check for the "political_office_helds" condition
        if (key === "political_office_helds" && value.start_year) {
          if (value.start_year.$lte && value.start_year.$gte) {
            const range = `${value.start_year.$gte} - ${value.start_year.$lte}`;
            allValues.push(`Range: ${range}`);
          } else if (value.start_year.$lt) {
            allValues.push(`Before ${value.start_year.$lt}`);
          } else if (value.start_year.$gt) {
            allValues.push(`After ${value.start_year.$gt}`);
          }
        }
        
        // Check for the "educations" condition
        else if (key === "educations" && value.year) {
          if (value.year.$lte && value.year.$gte) {
            const range = `${value.year.$gte} - ${value.year.$lte}`;
            allValues.push(`Range: ${range}`);
          } else if (value.year.$lt) {
            allValues.push(`Before ${value.year.$lt}`);
          } else if (value.year.$gt) {
            allValues.push(`After ${value.year.$gt}`);
          }
        }
        else if (key === "residence_in_1977s" && value.total_population) {
          if (value.total_population.$lte && value.total_population.$gte ) {
            const range = `${value.total_population.$gte} - ${value.total_population.$lte}`;
            allValues.push(`Population Range: ${range}`);
          }
          else if (value.total_population.$gte ) {
            allValues.push(`Population: ${value.total_population.$gte}+`);
          }
        }
        else if (key === "residence_in_1977s" && value.median_household_income) {
          if (value.median_household_income.$lte && value.median_household_income.$gte ) {
            const range = `${value.median_household_income.$gte} - $${value.median_household_income.$lte}`;
            allValues.push(`Income Range: $${range}`);
          }
          else if (value.median_household_income.$gte ) {
            allValues.push(`Income: $${value.median_household_income.$gte}+`);
          }
        }
        else {
          // Process nested values as before
          for (const nestedKey of Object.keys(value)) {
            if (nestedKey === 'createdAt' || nestedKey === 'updatedAt') continue; // Skip these attributes
            const nestedValue = value[nestedKey];
            if (typeof nestedValue === 'object') {
              for (const deeplyNestedValue of Object.values(nestedValue)) {
                allValues.push(deeplyNestedValue);
              }
            } else {
              allValues.push(nestedValue);
            }
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
    let queryObj = {
      populate: categories,
      sort: [{'last_name': "asc"}],
    }
    data.switch ? queryObj.filters = { $and: array_query } : queryObj.filters = { $or: array_query };
    let query = qs.stringify(queryObj, { encodeValuesOnly: true });
    if (array_query.length === 0) {
      alert('No search input')
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/nwc-participants?${query}`).then(res => res.json());
      if (response.data.length === 0) {
        setIsButtonClicked(true);
      } else {
        const mapData = response.data.map((person) => {
          return {
            lat: person.attributes.lat,
            lon: person.attributes.lon,
            first_name: person.attributes.first_name,
            last_name: person.attributes.last_name,
          };
        });
        setMap(mapData);
        const tableData = processTableData(response, categories, allCategories, allValues); // response is API response, newArray
        setTableData(tableData);
        setIsButtonClicked(true);
      }
    }
  }
  

  //Reset funnction for button
  const clearForm = () => {
    reset();
    setSelectedOptions({ represented_state: null, races: null, decade: null });
    setTableData([])
    setMap([])
    setIsButtonClicked(false);
    setAgeCheckboxState({
      age16to25: false,
      age26to55: false,
      age56plus: false,
    });
    setchildrenCheckboxState({
      children_12: false,
      children_34: false,
      children5: false,
    })
    setclickedPlanks({})
    setHasChildren(null)
    setIsToggleOn(true)
  }
  const [selectedOptions, setSelectedOptions] = useState({});
    // State to track the toggle status
  const [isToggleOn, setIsToggleOn] = useState(true);
  // Function to handle toggle change
  const handleToggleChange = (event) => {
    setIsToggleOn(event.target.checked);
  };

  const CheckboxOption = (props) => {
    return (
      <components.Option {...props}>
        <label style={{ flexGrow: 1 }}>{props.label}</label>
        <div style={{ width: '20px', textAlign: 'right' }}> {/* Fixed width container for checkbox */}
          <input
            type="checkbox"
            checked={props.isSelected} // Keeps the checkbox checked when selected
            onChange={() => null} // Prevents triggering action on checkbox click
            style={{ marginLeft: '10px', width: '16px', height: '16px' }} // Sets fixed size for checkbox
          />
        </div>
      </components.Option>
    );
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Banner
        imgLeft={button}
        text={contentMap?.attributes?.AdvancedSearch_Banner}
        imgRight={JaniceRubin}
        imgCredit={contentMap?.attributes?.BannerImage_Credit}
      />
    <div className="advancedSearch_font">
      <div className="advancedSearch">
        <div className="advancedSearch_text">
          <h1>ADVANCED SEARCH</h1>
          <hr></hr>
          <h2>HOW TO SEARCH THIS DATA</h2>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_HowTo}</ReactMarkdown>
        </div>
      </div>
        <div  className="advancedSearch"> 
        <Tabs> 
            <div label="NWC Participation">
            <div className="advancedSearch_form">
            <InfoBox category="National Women's Conference Participation" text={contentMap?.attributes?.AdvancedSearch_NWC || ''} />
                <h1> Role AT NWC <br></br> Select One or More Roles: </h1>
                <div className="item_Collapsible_Container">
                    <div className="item_Collapsible">
                      {roleCategories.map((category, index) => {
                        if (category.category === "NWC Caucuses") {
                          return null; // Skip the certain category, we'll add it in the second column
                        }
                        return (
                          <Collapsible label={category.category} key={index}>
                            {category.roles.map((role, index) => (
                              <label className="advancedSearch_form-control" key={index}>
                                <input type="checkbox" value={role} {...register("roles.role")} />
                                {role}
                              </label>
                            ))}
                          </Collapsible>
                        );
                      })}
                    </div>
                      <div className="item_Collapsible_Column">
                        {/* Render the specific Collapsible in the second column */}
                        {roleCategories.map((category, index) => {
                          if (category.category === "NWC Caucuses") {
                            return (
                              <Collapsible label={category.category} key={index}>
                                {category.roles.map((role, index) => (
                                  <label className="advancedSearch_form-control" key={index}>
                                    <input type="checkbox" value={role} {...register("roles.role")} />
                                    {role}
                                  </label>
                                ))}
                              </Collapsible>
                            );
                          }
                          return null; // Skip other categories
                        })}
                        {/* Other Role in the second column */}
                        <div className="advancedSearch_otherRole">
                          <label className="advancedSearch_form-control">
                            <input type="checkbox"/>
                            Other Role
                            <input type="text" {...register("roles.role.$containsi")} />
                          </label>
                        </div>
                      </div>
                    </div>
                <div className="advancedSearch_container">
                <h1> Position Planks <br></br> Select One or More Planks: </h1>
                
                <div className="item_NWC">
                {plank.map((plank, index) => {
                  const isChecked = !!clickedPlanks[plank.value];
                  return (
                    <div key={index}>
                      <label className="advancedSearch_form-control">
                      <input
                        type="checkbox"
                        value={plank.value}
                        checked={!!clickedPlanks[plank.value]} // Ensure the checkbox state is controlled
                        onChange={() => handleCheckboxClick(plank.value)}
                      />
                        {plank.label}
                      </label>
                      {isChecked && (
                        <div className="item_planks">
                          <label className="advancedSearch_form-control">
                            <input type="checkbox" value={plank.value} {...register("planks_fors.plank")} />
                            For
                          </label>
                          <label className="advancedSearch_form-control">
                            <input type="checkbox" value={plank.value} {...register("planks_against.plank")} />
                            Against
                          </label>
                          <label className="advancedSearch_form-control">
                            <input type="checkbox" value={plank.value} {...register("planks_spoke_fors.plank")} />
                            Spoke about with position unknown
                          </label>
                            </div>
                          )}
                    </div>
                  );
                })}
                  </div> 
                </div>
              </div>
            </div>    
            <div label="Participant Demographics">
            <div className="advancedSearch_form">
            <InfoBox category="Participant Demographics" text={contentMap?.attributes?.AdvancedSearch_Participants}/>
              <div className="advancedSearch_container">
                <h1> Age range</h1>
                <div className="item">
                  <label className="advancedSearch_form-control">
                    <input
                      type="checkbox"
                      checked={ageCheckboxState.age16to25}
                      onChange={(e) => handleAgeCheckboxChange('age16to25', e.target.checked)}
        
                    />
                    16-25
                  </label>
                  <label className="advancedSearch_form-control">
                    <input
                      type="checkbox"
                      checked={ageCheckboxState.age26to55}
                      onChange={(e) => handleAgeCheckboxChange('age26to55', e.target.checked)}
                    />
                    26-55
                  </label>
                  <label className="advancedSearch_form-control">
                    <input
                      type="checkbox"
                      checked={ageCheckboxState.age56plus}
                      onChange={(e) => handleAgeCheckboxChange('age56plus', e.target.checked)}
                    />
                    56 and over
                  </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> State/territory</h1>
                <div className="item_DEMO" >
                  <div className="advancedSearch_form-control" >
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

                            field.onChange(selectedOption.map(option => option.value));

                        }}
                        selectedOptions={selectedOptions["represented_state"] || []}
                      />
                    )}
                  />
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> place of birth</h1>
                <div className="item">
                <label className="advancedSearch_input">
                <input type="text" {...register('place_of_birth.$containsi')} /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> city of residence in 1977</h1>
                <div className="item_DEMO">
                <label className="advancedSearch_input">
                <input type="text" {...register('residence_in_1977s.city_state.$containsi')}/> </label> 
                <div className="advancedSearch_form-control">
                <Controller 
                    control={control}
                    render={({ field }) => (
                      <Select
                      styles={{container: base => ({ ...base, width: "max-content", minWidth: "11%"})}}
                        options={populationOptions} 
                        onChange={(selectedOption) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            population: selectedOption.value
                          }));
                          field.onChange(selectedOption.value);
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.population ? populationOptions.find(option => option.value === selectedOptions.population) : null}
                        placeholder="Population"
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                <Controller 
                    control={control}
                    render={({ field }) => (
                      <Select
                      styles={{container: base => ({ ...base, width: "max-content", minWidth: "11%"})}}
                        options={incomeOptions} 
                        onChange={(selectedOption) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            income: selectedOption.value
                          }));
                          field.onChange(selectedOption.value);
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.income ? populationOptions.find(option => option.value === selectedOptions.income) : null}
                        placeholder="Median Household Income"
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                  </div>                
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> marital</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="single" {...register('marital_classification')} />Single </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="married" {...register('marital_classification')} />Married </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="partnered"{...register('marital_classification')}/>Partnered </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="divorced"{...register('marital_classification')} />Divorced</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="widowed"{...register('marital_classification')}/>Widowed</label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1>name of spouse</h1>
                <div className="item">
                <label className="advancedSearch_input">
                <input type="text" {...register('name_of_spouse.$containsi')}/> </label>                
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1>Has children</h1>
                <div className="item">
                  <label className="advancedSearch_form-control">
                    <input
                      type="radio"
                      value="true"
                      checked={hasChildren === true}
                      onChange={() => setHasChildren(true)}
                    />
                    Yes
                  </label>
                  <label className="advancedSearch_form-control">
                    <input
                    {...register('has_children')}
                      type="radio"
                      value="false"
                      checked={hasChildren === false}
                      onChange={() => setHasChildren(false)}
                    />
                    No
                  </label>
                </div>

                {hasChildren && (
                <div className="advanced_children">
                <label className="advancedSearch_form-control">
                  <input
                    type="checkbox"
                    checked={childrenCheckboxState.children_12}
                    onChange={(e) => handleChildrenCheckbox('children_12', e.target.checked)}
                  />
                  1-2
                </label>
                <label className="advancedSearch_form-control">
                  <input
                    type="checkbox"
                    checked={childrenCheckboxState.children_34}
                    onChange={(e) => handleChildrenCheckbox('children_34', e.target.checked)}
                  />
                  3-4
                </label>
                <label className="advancedSearch_form-control">
                  <input
                    type="checkbox"
                    checked={childrenCheckboxState.children5}
                    onChange={(e) => handleChildrenCheckbox('children5', e.target.checked)}
                  />
                  5+
                </label>
              </div>
                )}
              </div>
              <div className="advancedSearch_container">
                <h1> religion</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                    <Controller
                      control={control}
                      name="religion"
                      render={({ field }) => (
                        <Select
                          isMulti
                          closeMenuOnSelect={false} // Keeps the menu open after selection
                          hideSelectedOptions={false} // Keeps selected options visible in the dropdown
                          options={religionOptions}
                          components={{ Option: CheckboxOption }} // Custom option with checkboxes
                          onChange={(selectedOptions) => {
                            setSelectedOptions((prevOptions) => ({
                              ...prevOptions,
                              religion: selectedOptions,
                            }));
                            field.onChange(selectedOptions.map((option) => option.value));
                          }}
                          onBlur={field.onBlur}
                          value={selectedOptions.religion || []}
                          placeholder="Select..."
                          name={field.name}
                          ref={field.ref}
                          styles={{
                            container: base => ({ ...base, width: 'max-content', minWidth: '15%' }),
                            control: base => ({
                              ...base,
                              maxWidth: '300px', // Set a max width for the select component
                              flexWrap: 'wrap', // Allows the selected options to wrap within the select
                              whiteSpace: 'normal', // Prevents the selected options from extending the container size
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected ? 'transparent' : base.backgroundColor, // Remove blue background
                              color: 'black', // Set text color to black
                              display: 'flex', // Makes the label and checkbox aligned horizontally
                            }),
                            valueContainer: base => ({
                              ...base,
                              maxWidth: '300px', // Ensures the value container doesn't expand indefinitely
                              display: 'flex',
                              flexWrap: 'wrap', // Enables wrapping of selected options
                              overflow: 'hidden', // Prevents overflowing content
                            }),
                            multiValue: base => ({
                              ...base,
                              backgroundColor: '#e2e2e2', // Change the background of selected value pill (optional)
                            }),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> gender</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="female" {...register('gender')}/>Female</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="male" {...register('gender')}/>Male </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" {...register('gender')}/>Transgender </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" {...register('gender')}/>Non-binary </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> sexual orientation</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                  <Controller 
                    control={control}
                    name="sexual_orientation"
                    render={({ field }) => (
                      <Select
                        isMulti
                        closeMenuOnSelect={false} // Keeps the menu open after selection
                        hideSelectedOptions={false} // Keeps selected options visible in the dropdown
                        options={sexualOrientation}
                        components={{ Option: CheckboxOption }} // Custom option with checkboxes
                        onChange={(selectedOptions) => {
                          setSelectedOptions((prevOptions) => ({
                            ...prevOptions,
                            sexual_orientation: selectedOptions,
                          }));
                          field.onChange(selectedOptions.map((option) => option.value));
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.sexual_orientation || []}
                        placeholder="Select..."
                        name={field.name}
                        ref={field.ref}
                        styles={{
                          container: base => ({ ...base, width: 'max-content', minWidth: '15%' }),
                          control: base => ({
                            ...base,
                            maxWidth: '300px', // Set a max width for the select component
                            flexWrap: 'wrap', // Allows the selected options to wrap within the select
                            whiteSpace: 'normal', // Prevents the selected options from extending the container size
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? 'transparent' : base.backgroundColor, // Remove blue background
                            color: 'black', // Set text color to black
                            display: 'flex', // Makes the label and checkbox aligned horizontally
                          }),
                          valueContainer: base => ({
                            ...base,
                            maxWidth: '300px', // Ensures the value container doesn't expand indefinitely
                            display: 'flex',
                            flexWrap: 'wrap', // Enables wrapping of selected options
                            overflow: 'hidden', // Prevents overflowing content
                          }),
                          multiValue: base => ({
                            ...base,
                            backgroundColor: '#e2e2e2', // Change the background of selected value pill (optional)
                          }),
                        }}
                      />
                    )}
                  /> </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1>Race and Ethnicity</h1>
                <div className="item_race">
                  {race_ethnicity.map((item) => (
                    <div className="advancedSearch_form-control item_race_layout" key={item.race}>
                      <label>{item.race}</label>
                      <Controller
                        control={control}
                        name={`races.race`}
                        render={({ field }) => (
                          <Select
                            isMulti
                            styles={{
                              container: (base) => ({
                                ...base,
                                minWidth: '70%',
                                maxWidth: '70%',
                              }),
                              control: (base) => ({
                                ...base,
                                minWidth: '65%',
                                maxWidth: '65%',
                              }),
                            }}
                            options={[
                              { value: 'all', label: 'All Identities' },
                              ...item.identities.map(identity => ({ value: identity, label: identity })),
                            ]}
                            onChange={(selectedOptions) => {
                              let finalSelections = selectedOptions;

                              // Check if "All Identities" is selected
                              if (selectedOptions.some(option => option.value === 'all')) {
                                finalSelections = item.identities.map(identity => ({
                                  value: identity,
                                  label: identity,
                                }));
                              }

                              setSelectedOptions(prevOptions => ({
                                ...prevOptions,
                                races: {
                                  ...prevOptions.races,
                                  [item.race]: finalSelections, // Store the finalSelections directly
                                }
                              }));

                              // Update the field value
                              field.onChange(finalSelections);
                            }}
                            onBlur={field.onBlur}
                            value={selectedOptions.races?.[item.race] || []} // Ensure it matches the format of the options array
                            placeholder="Select..."
                            name={field.name}
                            ref={field.ref}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>  
            </div>
            <div label="Education & Career">
            <div className="advancedSearch_form">
            <InfoBox category="Education & Career" text={contentMap?.attributes?.AdvancedSearch_Education}/>
            <div className="advancedSearch_container">
              <h1> Education completed</h1>
              <div className="item_EDU">
                <div className="edu_column">
                  <label className="advancedSearch_form-control">
                    <input type="checkbox" value="some high school" {...register(`highest_level_of_education_attained`)} />Some High School
                  </label>
                  <label className="advancedSearch_form-control">
                    <input type="checkbox" value="high school diploma" {...register(`highest_level_of_education_attained`)} />High School Diploma
                  </label>
                  <label className="advancedSearch_form-control">
                    <input type="checkbox" value="some college" {...register(`highest_level_of_education_attained`)} />Some college
                  </label>
                  <label className="advancedSearch_form-control">
                    <input type="checkbox" value="college degree" {...register(`highest_level_of_education_attained`)} />College degree
                  </label>
                  <label className="advancedSearch_form-control">
                    <input type="checkbox" value="graduate/professional degree" {...register(`highest_level_of_education_attained`)} />Graduate professional
                  </label>
                </div>
                <div className="edu_column">
                  <div className="item_EDU_row">
                      <h1>Learning establishment name</h1>
                      <input type="text" {...register('educations.institution.$containsi')}/>
                  </div>
                  <div className="item_EDU_row">
                      <h1>decade graduated/left</h1>
                      <div className="advancedSearch_form-control">
                      <Controller
                        control={control}
                        name={`educations.year`}
                        render={({ field }) => (
                          <Select
                            isMulti
                            closeMenuOnSelect={false} // Keeps the menu open after selection
                            hideSelectedOptions={false} // Keeps selected options visible in the dropdown
                            options={decadeOptions}
                            components={{ Option: CheckboxOption }} // Custom option with checkboxes
                            onChange={(selectedOptions) => {
                              setSelectedOptions((prevOptions) => ({
                                ...prevOptions,
                                decadeEDU: selectedOptions,
                              }));
                              
                            }}
                            onBlur={field.onBlur}
                            value={selectedOptions.decadeEDU || []} // Ensure value is an array
                            placeholder="Select..."
                            name={field.name}
                            ref={field.ref}
                            styles={{
                              container: base => ({ ...base, width: 'max-content', minWidth: '15%' }),
                              control: base => ({
                                ...base,
                                maxWidth: '300px', // Set a max width for the select component
                                flexWrap: 'wrap', // Allows the selected options to wrap within the select
                                whiteSpace: 'normal', // Prevents the selected options from extending the container size
                              }),
                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? 'transparent' : base.backgroundColor, // Remove blue background
                                color: 'black', // Set text color to black
                                display: 'flex', // Makes the label and checkbox aligned horizontally
                              }),
                              valueContainer: base => ({
                                ...base,
                                maxWidth: '300px', // Ensures the value container doesn't expand indefinitely
                                display: 'flex',
                                flexWrap: 'wrap', // Enables wrapping of selected options
                                overflow: 'hidden', // Prevents overflowing content
                              }),
                              multiValue: base => ({
                                ...base,
                                backgroundColor: '#e2e2e2', // Change the background of selected value pill (optional)
                              }),
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
               <div className="advancedSearch_container">
                <h1> Degree</h1>
                <div className="item">
                <label className="advancedSearch_input">
                <input type="text" {...register('educations.degree.$containsi')}/> </label>
                </div>
              </div>
               <div className="advancedSearch_container">
                <h1> Military service</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="true" {...register('military_service')} />Yes </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                  <h1>job/profession</h1>
                  <div className="item_DEMO">
                    <div className="advancedSearch_form-control">
                      <Controller 
                        control={control}
                        name="careers.category_of_employment"
                        render={({ field }) => (
                          <Select
                            isMulti
                            styles={{ container: base => ({ ...base, width: "max-content", minWidth: "14%" }) }}
                            options={professions}
                            onChange={(selectedOptions) => {
                              setSelectedOptions(prevOptions => ({
                                ...prevOptions,
                                "careers.category_of_employment": selectedOptions
                              }));
                              field.onChange(selectedOptions.map(option => option.value)); // Update field value with an array of selected values
                            }}
                            onBlur={field.onBlur}
                            value={selectedOptions["careers.category_of_employment"] || []}
                            placeholder="Select..."
                            name={field.name}
                            ref={field.ref}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              <div className="advancedSearch_container">
                <h1> job/profession keyword search</h1>
                <div className="item">
                <label className="advancedSearch_input">
                <input type="text" {...register('careers.job_profession.$containsi')}/> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> income level</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="low income" {...register('income_level')}/>Low Income </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="medium income" {...register('income_level')}/>Medium Income </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="high income" {...register('income_level')}/>High Income </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> spouse&apos;s job/profession</h1>
                <div className="item">
                <label className="advancedSearch_input">
                <input type="text" {...register('spouses.professions.$containsi')}/> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> Union member</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="true" {...register('union_member')} />Yes </label>
                </div>
              </div>
              </div>
            </div> 
            <div label="Electoral Politics">
            <div className="advancedSearch_form">
            <InfoBox category="Electoral Politics" text={contentMap?.attributes?.AdvancedSearch_Politics}/>
            <div className="advancedSearch_container">
              <h1>political party membership</h1>
              <div className="item_DEMO">
                <div className="advancedSearch_form-control">
                  <Controller 
                    control={control}
                    name="political_parties.party"
                    render={({ field }) => (
                      <Select
                        isMulti
                        styles={{ container: base => ({ ...base, width: "max-content", minWidth: "15%" }) }}
                        options={politicalOptions}
                        onChange={(selectedOptions) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            political_parties: selectedOptions
                          }));
                          field.onChange(selectedOptions.map(option => option.value)); // Update field value with an array of selected values
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.political_parties || []} // Ensure value is an array
                        placeholder="Select..."
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                </div>
              </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> jurisdiction of political offices held </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="city level" {...register('political_office_helds.jurisdiction')} />City </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="county level" {...register('political_office_helds.jurisdiction')}/>County </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="state level" {...register('political_office_helds.jurisdiction')}/>State </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="regional level" {...register('political_office_helds.jurisdiction')}/>Regional </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox"value="federal level" {...register('political_office_helds.jurisdiction')}/>Federal </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="" {...register('political_office_helds.jurisdiction')}/>None </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_input">
                <input type="text" {...register('political_office_helds.political_office.$containsi')}/> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> decade political offices held</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                    <Controller
                      control={control}
                      name={`political_office_helds.start_year`}
                      render={({ field }) => (
                        <Select
                          isMulti
                          closeMenuOnSelect={false} // Keeps the menu open after selection
                          hideSelectedOptions={false} // Keeps selected options visible in the dropdown
                          options={decadeOptions}
                          components={{ Option: CheckboxOption }} // Custom option with checkboxes
                          onChange={(selectedOptions) => {
                            setSelectedOptions((prevOptions) => ({
                              ...prevOptions,
                              decade: selectedOptions,
                            }));
                            
                          }}
                          onBlur={field.onBlur}
                          value={selectedOptions.decade || []} // Ensure value is an array
                          placeholder="Select..."
                          name={field.name}
                          ref={field.ref}
                          styles={{
                            container: base => ({ ...base, width: 'max-content', minWidth: '15%' }),
                            control: base => ({
                              ...base,
                              maxWidth: '300px', // Set a max width for the select component
                              flexWrap: 'wrap', // Allows the selected options to wrap within the select
                              whiteSpace: 'normal', // Prevents the selected options from extending the container size
                            }),
                            option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected ? 'transparent' : base.backgroundColor, // Remove blue background
                              color: 'black', // Set text color to black
                              display: 'flex', // Makes the label and checkbox aligned horizontally
                            }),
                            valueContainer: base => ({
                              ...base,
                              maxWidth: '300px', // Ensures the value container doesn't expand indefinitely
                              display: 'flex',
                              flexWrap: 'wrap', // Enables wrapping of selected options
                              overflow: 'hidden', // Prevents overflowing content
                            }),
                            multiValue: base => ({
                              ...base,
                              backgroundColor: '#e2e2e2', // Change the background of selected value pill (optional)
                            }),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> jurisdiction of political offices sought but lost </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="city level" {...register('political_office_losts.jurisdiction')}/>City </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="county level" {...register('political_office_losts.jurisdiction')}/>County </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox"value="state level" {...register('political_office_losts.jurisdiction')}/>State </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox"value="regional level" {...register('political_office_losts.jurisdiction')}/>Regional </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox"value="federal level" {...register('political_office_losts.jurisdiction')}/>Federal </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox"value="" {...register('political_office_losts.jurisdiction')}/>None </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices sought but lost</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_input">
                <input type="text" {...register('political_office_losts.political_office.$containsi')}/> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices spouse held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_input">
                <input type="text" {...register('spouses.political_offices.$containsi')}/> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> identified as a feminist</h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('self_identified_feminist')}/>Yes </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="false" {...register('self_identified_feminist')}/>No </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> President&apos;s Commission on the status of women </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('city_level_commission')}/>Yes </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> Commission on the status of women </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('city_level_commission')}/>City </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('county_level_commission')}/>County </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('state_level_commission')}/>State </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> National advisory committee</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="true" {...register('national_advisory_committee')} />Yes </label>
                </div>
              </div>
            </div>       
            </div> 
            <div label="Organizations">
            <div className="advancedSearch_form">
            <InfoBox category="Organizations" text={contentMap?.attributes?.AdvancedSearch_Organizations}/>
            <div className="advancedSearch_container">
                <h1> organization name</h1>
                <div className="item_ORG">
                  <div className="item_ORG_row">
                    <h1>Search by Organization Name</h1>
                    <input
                      type="text"
                      placeholder="Search"
                      {...register('organizational_politicals.organizational_and_political.$containsi')}
                    />
                  </div>
                  <div className="item_ORG_row">
                    <h1>Search by participant name</h1>
                    <input
                      type="text"
                      placeholder="Search"
                      {...register('organizational_politicals.participants.last_name.$startsWith')}
                    />
                  </div>
                </div>  
              </div>
              <div className="advancedSearch_container">
                <h1> leadership positions</h1>
                <div className="advancedSearch_form-control">
                <div className="item_ORG">
                  <div className="item_ORG_row">
                  <h1>category of leadership position</h1>
                  <Controller
                      control={control}
                      name="leadership_in_organizations.role"
                      render={({ field }) => (
                        <Select
                          isMulti
                          styles={{
                            container: (base) => ({
                              ...base,
                              minWidth: '54%',
                              maxWidth: '54%', // Ensure it doesn’t exceed the container width
                            }),
                            control: (base) => ({
                              ...base,
                              minWidth: '65%', // Set a reasonable minimum width
                              maxWidth: '65%', // Prevent it from expanding beyond the container
                              
                            }),
                          }}
                          options={leaderships}
                          onChange={(selectedOptions) => {
                            setSelectedOptions(prevOptions => ({
                              ...prevOptions,
                              "leadership_in_organizations.role": selectedOptions
                            }));
                            field.onChange(selectedOptions.map(option => option.value)); // Update field value with an array of selected values
                          }}
                          onBlur={field.onBlur}
                          value={selectedOptions["leadership_in_organizations.role"] || []}
                          placeholder="Select..."
                          name={field.name}
                          ref={field.ref}
                        />
                      )}
                    />
                    </div>
                  <div className="item_ORG_row">
                    <h1>specific leadership role</h1>
                    <input
                      type="text"
                      placeholder="Search"
                      {...register('leadership_in_organizations.specific_role.$containsi')}
                    />
                  </div>
                  <div className="item_ORG_row">
                    <h1>Search by Organization Name</h1>
                    <input
                      type="text"
                      placeholder="Search"
                      {...register('leadership_in_organizations.organizations.$containsi')}
                    />
                  </div>
                  <div className="item_ORG_row">
                    <h1>Search by participant name</h1>
                    <input
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </div>    
              </div>
              </div>
            </div> 
            </div>
          </Tabs>
          </div>
          <div className="advancedSearch_toggle">
            <div className='basicSearch_toggle-left'>
              {isToggleOn ? 'Broaden search results' : 'Narrow search results'}
              <div className='basicSearch_toggle-container'>
                <img className='infoIcon' src={infoIcon} alt="_" />
                <div className="basicSearch_toggle-tooltip">
                  <p><b>Off</b> WIDENS the results to all the participants for whom at least one of the selections are true.</p>
                  <p>Ex: Notable Speakers <strong>OR</strong> Catholic <strong>OR</strong> Republican</p>
                  <p><strong>On</strong> NARROWS the results list to only the participants for whom all selections are true.</p>
                  <p>Ex: Notable Speakers <strong>AND</strong> Catholic <strong>AND</strong> Republican</p>
                </div>
              </div>
            </div>
            <label className="basicSearchswitch">
              <input 
                type="checkbox" 
                {...register("switch")} 
                defaultChecked={isToggleOn} 
                onChange={handleToggleChange}
              />
              <span className="slider round"></span>
            </label>
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
      </div>
      </form>
      </>
  )
}

export default AdvancedSearch