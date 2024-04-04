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

  const raceData = ["Black", "Chicana/Chicano", "Latina/Latino","Mexican American", "Native American/American Indian", "Spanish/Hispanic", "white"]
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

      const [role, setRoles] = useState([])

      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/nwc-roles?sort=role&filters[role][$notContainsi]=Other Role`)
          .then(res => res.json())
          .then(data => {
            const roles = data.data.map(item => item.attributes.role);
            setRoles(
              roles.map(label => {
                return {
                  value: label,
                  label: label
                };
              })
            );
          })
          .catch(err => console.log(err));
      }, []);

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

  const handleAgeCheckboxChange = (name, checked) => {
    setAgeCheckboxState({
      ...ageCheckboxState,
      [name]: checked,
    });
  };

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
    <div className="advancedSearch_font">
      <div className="advancedSearch">
        <div className="advancedSearch_text">
          <h1> ADVANCED SEARCH PAGE</h1>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Banner}</ReactMarkdown>
        </div>
      </div>
      <div className="advancedSearch"> 
      <div className="advancedSearch_bar_container">
        <div className="advancedSearch_bar">
            <input type="text" placeholder="SEARCH"/>
            </div>
        </div>   
        </div>
        <div> 
          <Collapsible label="NATIONAL WOMEN'S CONFERENCE PARTICIPATION"> 
          <div style={{marginBottom: "80rem"}}>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_NWC}</ReactMarkdown>
          </div>
          <Tabs> 
            <div label="ROLE AT NWC">
            <div className="advancedSearch_form">
            <div className="advancedSearch_container">
              <h1> Select one or more roles: </h1>
              <div className="item_NWC">
              {role.map((role, index) => {
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
            <div label="Plank position">
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
          </Tabs>
          </Collapsible>
          <Collapsible label="PARTICIPANT DEMOGRAPHICS"> 
          <div style={{marginBottom: "80rem"}}>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Participants}</ReactMarkdown>
            </div>
            <div className="advancedSearch_form">
              <div className="advancedSearch_container">
                <h1> Age range</h1>
                <div className="item">
                  <label className="advancedSearch_form-control">
                    <input
                      type="checkbox"
                      checked={ageCheckboxState.age1to39}
                      onChange={(e) => handleAgeCheckboxChange('age1to39', e.target.checked)}
                    />
                    1-39
                  </label>
                  <label className="advancedSearch_form-control">
                    <input
                      type="checkbox"
                      checked={ageCheckboxState.age40to64}
                      onChange={(e) => handleAgeCheckboxChange('age40to64', e.target.checked)}
                    />
                    40-64
                  </label>
                  <label className="advancedSearch_form-control">
                    <input
                      type="checkbox"
                      checked={ageCheckboxState.age65plus}
                      onChange={(e) => handleAgeCheckboxChange('age65plus', e.target.checked)}
                    />
                    65+
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
                <input type="checkbox" value="married" {...register('marital_classification')} />married </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="partnered"{...register('marital_classification')}/>partnered </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="divorced"{...register('marital_classification')} />divorced</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="widowed"{...register('marital_classification')}/>widowed</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value=""{...register('marital_classification')}/>unknown</label>
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
                    <input type="radio" value="true" {...register("has_children")}/>
                    Yes
                  </label>
                  <label className="advancedSearch_form-control">
                    <input type="radio" value="false" {...register("has_children")}/>
                    No
                  </label>
                </div>
                </div>
                  {/* <div className="advancedSearch_container">
                    <h1>Number of children</h1>
                    <div className="item">
                      <label className="advancedSearch_form-control">
                        <input
                          type="checkbox"
                          value="3"
                          {...register("total_number_of_children.$lte", {max: 3, min: 1})}
                        />
                        1-3
                      </label>
                      <label className="advancedSearch_form-control">
                        <input
                          type="checkbox"
                          value={4}
                          {...register("[1].total_number_of_children.$gte", {
                            valueAsNumber: true,
                          })}
                        />
                        4 or more
                      </label>
                    </div>
                    </div> */}
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
                <h1>race and ethnicity</h1>
                <div className="item_EDU">
                  {raceData.map((race) => {
                    return (
                      <label className="advancedSearch_form-control" key={race}>
                      <input type="checkbox" value={race} {...register(`races.race`)} /> {race} </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </Collapsible>
          <Collapsible label="EDUCATION AND CAREER"> 
          <div style={{marginBottom: "80rem"}}>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Education}</ReactMarkdown>
            </div>
            <div className="advancedSearch_form">
              <div className="advancedSearch_container">
                <h1> Education completed</h1>
                <div className="item_EDU">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="some high school" {...register(`highest_level_of_education_attained`)} />Some high school </label>
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
                <h1> Military service</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="true" {...register('military_service')} />Yes </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> job/profession</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                      <Controller 
                        control={control}
                        name="careers.category_of_employment"
                        render={({ field }) => (
                          <Select
                          styles={{container: base => ({...base, width: "max-content", minWidth: "14%"})}}
                            options={professions} 
                            onChange={(selectedOption) => {
                              setSelectedOptions(prevOptions => ({
                                ...prevOptions,
                                "careers.category_of_employment": selectedOption.value
                              }));
                              field.onChange(selectedOption.value);
                            }}
                            onBlur={field.onBlur}
                            value={selectedOptions["careers.category_of_employment"] ? professions.find(option => option.value === selectedOptions["careers.category_of_employment"]) : null}
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
          </Collapsible>
          <Collapsible label="ELECTORAL POLITICS"> 
            <div style={{marginBottom: "80rem"}}>
            <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Politics}</ReactMarkdown>
            </div>
            <div className="advancedSearch_form">
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
                <h1> political party membership</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                  <Controller 
                    control={control}
                    name="political_party_membership"
                    render={({ field }) => (
                      <Select
                      styles={{container: base => ({...base, width: "max-content", minWidth: "11%"})}}
                        options={politicalOptions} 
                        onChange={(selectedOption) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            political_party_membership: selectedOption.value
                          }));
                          field.onChange(selectedOption.value);
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.political_party_membership ? politicalOptions.find(option => option.value === selectedOptions.political_party_membership) : null}
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
                  <h1> identified as a feminist</h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('self_identified_feminist')}/>Yes </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="false" {...register('self_identified_feminist')}/>No </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />Unknown </label>
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
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" value="true" {...register('federal_level_commission')}/>President&apos;s Commission on the Status of Women </label>
                  </div>
              </div>
            </div>       
          </Collapsible>
          <Collapsible label="ORGANIZATIONS"> 
          <div style={{marginBottom: "80rem"}}>
          <ReactMarkdown>{contentMap?.attributes?.AdvancedSearch_Organizations}</ReactMarkdown>
            </div>
            <Tabs>
              {/* <div label="advocacy groups" >
                <div className="advancedSearch_form">
                  <div className="advancedSearch_container">
                    <h1> Select from list </h1>
                    <div className="item_NWC">
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />African American advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />animal rights advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />anti-poverty advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />anti-violence advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" /> asian american advocacy groups</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" /> community-based advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />conservative advocacy groups</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />disability advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />education advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />environmental advocacy groups</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />feminist advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />fraternal organizations</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />social clubs, and sororities </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" /> global advocacy groups</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />health care advocacy groups</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />heritage or history groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />indigenous populations advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />labor advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />latinx advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />lgbtq advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />political and legal advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />professional organizations </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />religious advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />reproductive health advocacy groups </label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />senior citizens</label>
                      <label className="advancedSearch_form-control">
                      <input type="checkbox" />veterans advocacy groups </label>
                    </div>      
                  </div>
                </div>
              </div> */}
              <div label="organizational memberships by name">
              <div className="advancedSearch_form">
                <div className="advancedSearch_container">
                  <h1> Organization Name </h1>
                    <div className="item">
                    <label className="advancedSearch_form-control">
                    <input type="text" {...register('organizational_and_politicals.organizational_and_political.$containsi')}/> </label>
                </div>
                </div>
                </div>
              </div>
              <div label="organizational leadership positions">
                <div className="advancedSearch_form">
                  <div className="advancedSearch_container">
                    <h1> Select Leadership Role</h1>
                    <div className="item_DEMO">
                      <div className="advancedSearch_form-control">
                      <Controller 
                        control={control}
                        name="leadership_in_organizations.role"
                        render={({ field }) => (
                          <Select
                          styles={{container: base => ({...base, width: "max-content", minWidth: "13%"})}}
                            options={leaderships} 
                            onChange={(selectedOption) => {
                              setSelectedOptions(prevOptions => ({
                                ...prevOptions,
                                "leadership_in_organizations.role": selectedOption.value
                              }));
                              field.onChange(selectedOption.value);
                            }}
                            onBlur={field.onBlur}
                            value={selectedOptions["leadership_in_organizations.role"] ? professions.find(option => option.value === selectedOptions["leadership_in_organizations.role"]) : null}
                            placeholder="Select..."
                            name={field.name}
                            ref={field.ref}
                          />
                        )}
                      />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs>
          </Collapsible>
        </div>
        <div className="advancedSearch"> 
        <div style={{border: "none", marginBottom: "50rem"}} className="advancedSearch_bar_container">
          <button type="submit" className="advancedSearch_button_search"> Search </button>
          <button type="reset" className="advancedSearch_button_reset" onClick={clearForm}> Reset </button>
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
      </div>
      </form>
  )
}

export default AdvancedSearch