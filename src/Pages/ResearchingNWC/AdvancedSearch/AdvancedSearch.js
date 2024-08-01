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
import { StateSelect } from '../../../Components/StateSelect/StateSelect';
import { Banner } from '../../../Components/Banner';
import { InfoBox } from '../Components/InfoBox';
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
    { value: "under5000", label: "under 5000" },
    { value: "5-20", label: "5,000-20,000" },
    { value: "20-50", label: "20,000-50,000" },
    { value: "50-100", label: "50,000-100,000" },
    { value: "100-500", label: "100,000-500,000" },
    { value: "500-1m", label: "500,000-1 million" },
    { value: "1million", label: "1 million and over" },
  ]

  const incomeOptions = [
    { value: "under6000", label: "under $6,000" },
    { value: "6000-12000", label: "$6,000-$12,000" },
    { value: "$12000", label: "over $12,000" },
  ]

  const religionData = ["Agnostic","Atheist","Baha’i","Catholic","Christian non-Catholic","Eastern Religions","Jewish","Mormon","Muslim","None","Other","Unitarian Universalist"];
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
                "Chicana Caucus", "Disabled Women’s Caucus", "Farm Women Caucus", "Hispanic Caucus", "Jewish Women’s Caucus",
                "Lesbian Caucus", "Minority Women’s Caucus", "National Congress of Neighborhood Women Caucus", "Peace Caucus",
                "Pro-Plan Caucus", "Puerto Rican Caucus", "Sex and Poverty IWY Poor and Low-Income Women’s Caucus", "Wellfare Caucus",
                "Women in Sports Caucus", "Youth Caucus"
                ]
      },
    ];

    const race_ethnicity = [
      {
        race: "Asian American/Pacific Islander",
        identities: "example"
      },
      {
        race: "Black",
        identities: "example"
      },
      {
        race: "Hispanic",
        identities: "example"
      },
      {
        race: "Middle Eastern",
        identities: "example"
      },
      {
        race: "Native American/American Indian",
        identities: "example"
      },
      {
        race: "White",
        identities: "example"
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
    data.total_number_of_children = undefined;
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
    if (ageCheckboxState.age16to25) {
      array_query.push({ 'age_in_1977': { $gte: 16, $lte: 25 } });
    }

    // Handle the '1-39' checkbox
    if (ageCheckboxState.age26to55) {
      array_query.push({ 'age_in_1977': { $gte: 26, $lte: 55 } });
    }

    // Handle the '65+' checkbox
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
      console.log(tableData)
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
      age16to25: false,
      age26to55: false,
      age56plus: false,
    });
    setchildrenCheckboxState({
      children_12: false,
      children_34: false,
      children5: false,
    })
    }, 50)
    setclickedPlanks({})
    setHasChildren(null)
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
            <InfoBox category="National Women's Conference Participation" text={contentMap?.attributes?.AdvancedSearch_NWC || ''} />
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
                {plank.map((plank, index) => {
                  const isChecked = !!clickedPlanks[plank.value];
                  return (
                    <div key={index}>
                      <label className="advancedSearch_form-control">
                        <input
                          type="checkbox"
                          value={plank.value}
                          // {...register(plank.value)}
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
                            <input type="checkbox" value={plank.value} {...register("planks_againsts.plank")} />
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
                  {/* <StateSelect onSelect={handleStateChange} selectedOptions={selectedStates}/> */}
                  <Controller
                    control={control}
                    name="represented_state"
                    render={({ field }) => (
                      <StateSelect
                        css={{ container: base => ({ ...base, width: "max-content", minWidth: "11%" })}}
                        onSelect={(selectedOption) => {
                          setSelectedOptions((prevOptions) => ({
                            ...prevOptions,
                            represented_state: selectedOption ? selectedOption.value : null,
                          }));

                          if (selectedOption && selectedOption[0]) {
                            field.onChange(selectedOption[0].value);
                          } 
                        }}
                        selectedOptions={selectedOptions.represented_state}
                      />
                    )}
                  />
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> place of birth</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('place_of_birth.$containsi')} /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> city of residence in 1977</h1>
                <div className="item_EDU">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('residence_in_1977.residence_in_1977.$containsi')}/> </label> 
                <div className="advancedSearch_form-control">
                  <Select
                  options={populationOptions} 
                  placeholder={'Population'}
                  /> 
                  <Select
                  options={incomeOptions} 
                  placeholder={'Median Household Income'}
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
                <label className="advancedSearch_form-control">
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
                      styles={{container: base => ({ ...base, width: "max-content", minWidth: "11%"})}}
                        options={religionOptions} 
                        onChange={(selectedOption) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            religion: selectedOption.value
                          }));
                          field.onChange(selectedOption.value);
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.religion ? religionOptions.find(option => option.value === selectedOptions.religion) : null}
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
                      styles={{container: base => ({...base,  width: "max-content", minWidth: "11%"})}}
                        options={sexualOrientation} 
                        onChange={(selectedOption) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            sexual_orientation: selectedOption.value
                          }));
                          field.onChange(selectedOption.value);
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.sexual_orientation ? sexualOrientation.find(option => option.value === selectedOptions.sexual_orientation) : null}
                        placeholder="Select..."
                        name={field.name}
                        ref={field.ref}
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
                        name={`races.${item.race}`}
                        render={({ field }) => (
                          <Select
                            styles={{ container: base => ({ ...base, width: "max-content", minWidth: "70%" }) }}
                            options={[{ value: item.identities, label: item.identities }]} // Assuming identities are the options
                            onChange={(selectedOption) => {
                              setSelectedOptions(prevOptions => ({
                                ...prevOptions,
                                [item.race]: selectedOption ? selectedOption.value : null
                              }));
                              field.onChange(selectedOption ? selectedOption.value : null);
                            }}
                            onBlur={field.onBlur}
                            value={selectedOptions[item.race] ? { value: selectedOptions[item.race], label: selectedOptions[item.race] } : null}
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
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="some high school" {...register(`highest_level_of_education_attained`)} />Some High School </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="high school diploma" {...register(`highest_level_of_education_attained`)} />High School Diploma</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="some college" {...register(`highest_level_of_education_attained`)} />Some college </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="college degree" {...register(`highest_level_of_education_attained`)} />College degree </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="graduate/professional degree" {...register(`highest_level_of_education_attained`)} />Graduate professional </label>
                </div>
               </div>
               <div className="advancedSearch_container">
                <h1> Degree</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('careers.job_profession.$containsi')}/> </label>
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
                <label className="advancedSearch_form-control">
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
                <label className="advancedSearch_form-control">
                <input type="text" {...register('spouse_careers.spouse_profession.$containsi')}/> </label>
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
                    name="political_party_membership"
                    render={({ field }) => (
                      <Select
                        isMulti
                        styles={{ container: base => ({ ...base, width: "max-content", minWidth: "11%" }) }}
                        options={politicalOptions}
                        onChange={(selectedOptions) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            political_party_membership: selectedOptions
                          }));
                          field.onChange(selectedOptions.map(option => option.value)); // Update field value with an array of selected values
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.political_party_membership || []} // Ensure value is an array
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
                  <input type="checkbox"value="federal level" {...register('political_office_helds.jurisdiction')}/>Federal </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="" {...register('political_office_helds.jurisdiction')}/>None </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('political_office_helds.political_office.$containsi')}/> </label>
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
                  <input type="checkbox"value="federal level" {...register('political_office_losts.jurisdiction')}/>Federal </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox"value="" {...register('political_office_losts.jurisdiction')}/>None </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices sought but lost</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('political_office_losts.political_office.$containsi')}/> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices spouse held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('spouse_political_offices.political_office.$containsi')}/> </label>
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
                      {...register('organizational_politicals.organizational_and_political.$containsi')}
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