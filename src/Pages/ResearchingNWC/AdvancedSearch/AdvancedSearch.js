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
import Map from "./Map"

//import Results from "./Results";
import '../ResearchingNWC.css'
import {ResultTableMap} from '../Components/ResultTableMap/ResultTableMap';


function AdvancedSearch() {

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

  async function onSubmit(data) {
    let array_query = [];

    Object.values(data).forEach((value, index) => {
      if (value !== undefined && value !== false) { // loop checks if any search value is null
        let hasNonEmptyProp = false;
        for (const prop in value) {
          if (
            value[prop] !== undefined &&
            value[prop] !== '' &&
            value[prop] !== false
          ) {
            let hasNonEmptyNestedProp = false;
        
            // Iterate over nested properties dynamically
            for (const nestedProp in value[prop]) {
              if (
                value[prop][nestedProp] !== undefined &&
                value[prop][nestedProp] !== '' &&
                value[prop][nestedProp] !== false
              ) {
                hasNonEmptyNestedProp = true;
                break;
              }
            }
            if (hasNonEmptyNestedProp) {
              hasNonEmptyProp = true;
              break;
            }
          }
        }
        if (hasNonEmptyProp) { // if result not empty, push
          const newObj = {};
          newObj[Object.keys(data)[index]] = value;
          array_query.push(newObj);
        }
      }
    });

    if (isAgeCheckboxChecked) {
      // Handle the case when the age '40-64' checkbox is checked
      const ageRangeQuery = {
        $gte: 40,
        $lte: 64,
      };
      array_query.push({
        'age_in_1977': ageRangeQuery,
      });
    }
    
    const query = qs.stringify({
      filters: {
        $or: array_query,
      },
      populate: ['residence_in_1977','role', 'races'],

    }, {
      encodeValuesOnly: true, // prettify URL
    });
    console.log('query: ', query)
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
      const tableData = response.data.map((person) => {
        return{
            'Name': `${person.attributes.last_name}, ${person.attributes.first_name} `,
            'Race': person.attributes.races.data.map((race)=> race.attributes.race),
            'Residence in 1977':person.attributes.residence_in_1977.data.attributes.residence_in_1977,
            'Role at NWC':person.attributes.role.data.map((role) => role.attributes.role),
        }
      })
      setTableData(tableData);
      setIsButtonClicked(true);
    }
  }
  }

  //Reset funnction for button
  const clearForm = () => {
    setTimeout(() => {
    reset();
    setSelectedOptions({});
    setTableData([])
    setMap([])
    setIsButtonClicked(false);
    }, 50)
  }

  const [selectedOptions, setSelectedOptions] = useState({});

  const [isAgeCheckboxChecked, setIsAgeCheckboxChecked] = useState(false);

  function handleAgeCheckboxChange(checked) {
    setIsAgeCheckboxChecked(checked);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="advancedSearch_font">
      <div className="advancedSearch">
        <div className="advancedSearch_text">
          <h1> ADVANCED SEARCH PAGE</h1>
          <p> We invite researchers to explore the richness of the NWC participant data in open searches or by cross-referencing data gathered within the six demographic categories below: Role at National Women's Conference, Participant Demographics, Education and Career, Electoral Politics, Organizational Memberships, and Leadership in Organizations </p>
          <p> Users can use keywords and Boolean operators by putting exact search terms in quotation marks and dividing search terms with AND/OR.</p>
          <p>Users can pull up all the demographic data located for one participant, if they know that participant's name, by doing a keyword search for that particpant's name.</p>
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
          <Collapsible label="ROLE AT NATIONAL WOMEN'S CONFERENCE"> 
          <div style={{marginBottom: "80rem"}}>
          <p>This search allows users to filter conference participants by category of participation. Additionally, users can keyword search the other, smaller roles at the NWC such as IWY
            Coordinating Committee membership or leader of a particular caucus. Data in this category also captures participant views about each of the twenty-six planks deliberated
            in Houston and submitted to President Jimmy Carter in 1978. Users can search NWC participant views about each of the planks: for, against, or spoke about with position unknown.</p> 
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
          <Collapsible label="PARTICIPANTS DEMOGRAPHICS"> 
          <div style={{marginBottom: "80rem"}}>
            <p>Participant Demographics captures the following: residence in 1977, gender, religion, marital status, number of children, sexual orientation, and racial and ethnic background.</p> 
            <p> We made no assumptions about identity, but instead followed what participants said about themselves in NWC registration forms, in the media, and their own writings.</p>
            <p> Participants with more than one racial or ethnic identity are noted according to all identities claimed.</p>
            <p> Aspects of identity, especially regarding sexual orientation, that might have changed after 1977 are explained in the biographical essays. Partcipants who publicy identified as bisexual
              or lesbian are reflected as such. Participants married to a person of the opposite gender are identified as heterosexual. Participants who identified their sexual orientation in different
              ways at different points in their life are noted here according to all known orientations. </p>
            </div>
            <div className="advancedSearch_form">
              <div className="advancedSearch_container">
                <h1> Age range</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" value='39' {...register('age_in_1977.$lte')}/> 1-39 </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" {...register('[2].age_in_1977')} onChange={(e) => handleAgeCheckboxChange(e.target.checked)} /> 40-64 </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" value="65" {...register('[1].age_in_1977.$gte')}/>65+ </label>
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
                      <Select
                      styles={{container: base => ({...base, width: "max-content", minWidth: "11%"})}}
                        options={stateOptions} 
                        onChange={(selectedOption) => {
                          setSelectedOptions(prevOptions => ({
                            ...prevOptions,
                            represented_state: selectedOption.value
                          }));
                          field.onChange(selectedOption.value);
                        }}
                        onBlur={field.onBlur}
                        value={selectedOptions.represented_state ? stateOptions.find(option => option.value === selectedOptions.represented_state) : null}
                        placeholder="Select..."
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  /></div>
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
                  {raceData.map((race, i) => {
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
            <p>Education and Career captures education level obtained, degree received, year of graduation, college attended, military service, occupation, and income level.</p> 
            <p>Users can sort participants by level of education. Once an educational level is selected, users can keyword search for colleges and universities where participants studied. 
              They can also keyword search degrees earned, and employment held. If users do not wish to undertake keyword searching, they can simply sort by level of education obtained.</p>
            <p>Users can sort participants by category of employment broken down by economic sectors. Additionally, users can keyword search specific jobs and careers</p>
            <p>Data about income level corresponds with categories used by the NWC to ensure balanced participation across social class.</p>
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
                <h1> spouse's job/profession</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" {...register('spouse_careers.spouse_profession.$containsi')}/> </label>
                </div>
              </div>
            </div>
          </Collapsible>
          <Collapsible label="ELECTORAL POLITICS"> 
            <div style={{marginBottom: "80rem"}}>
              <p>Electoral Politics captures elected, appointed, and senior staff political/policy positions. Users can search participants by the jurisdictional level of service-city, county, state, and federal-or they can keyword search by named offices.</p> 
              <p>Other searches and sorting features include political party membership, spousal political office holding, participant self-identification as a feminist, and service on city, county, and state level Commissions on the Status of Women.</p>
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
                  <input type="checkbox" value="true" {...register('federal_level_commission')}/>President's Commission on the Status of Women </label>
                  </div>
              </div>
            </div>       
          </Collapsible>
          <Collapsible label="ORGANIZATIONAL MEMBERSHIPS"> 
          <div style={{marginBottom: "80rem"}}>
            <p>Organizational Memberships is the most comprehensive of the categories. 
              In gathering this data, we were equally interested in capturing information
              for nationally known organizations such as the National Organization for
              Women (NOW) that claimed hundreds of NWC participants in its ranks and less well-known community 
              specific organizations that perhaps claimed only one NWC participant as a member</p> 
            <p> We grouped the organizations with which NWC participants were affiliated into twenty-seven
              thematic categories. Users can select one or more categories and find all participants who held
              memberships in those organizations. Click here to see the full list of organizations grouped by
              thematic category.
            </p>
            <p>Users can also keyword search the hundreds of organizations in which participants held memberships
              to find all participants in any one organization. To find a list of all organizations, click here.
            </p>
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
              <div label="organization name">
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
              <div label="leadership position">
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
          <ResultTableMap data={tableData} map_data={maps}/>
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