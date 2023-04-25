import '../ResearchingNWC'
import './AdvancedSearch.css'
import Collapsible from './Collapsible'
import Select from 'react-select';
import { useState, useEffect } from "react";
import VARIABLES from '../../../config/.env';
import Tabs from "./Tabs";
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios';


function AdvancedSearch() {

  // adding USA list of states for select input
  const stateOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ]

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

  const [religions, setReligions] = useState([[]]);

  useEffect(() => {
    fetch([VARIABLES.fetchBaseUrl, "api/religions"].join('/'))
    .then(res => res.json())
    .then(data => {
        setReligions(
            data.data.map(item => {
              return {
                value: item.id,
                label: item.attributes.religion
              }
            })
        )
    })
    .catch(err => console.log(err));
    }, []); 
  
  
  const [professions, setProfessions] = useState([[]]);
  
  useEffect(() => {
    fetch([VARIABLES.fetchBaseUrl, "api/data-careers?sort=category_of_employment"].join('/'))
    .then(res => res.json())
    .then(data => {
        setProfessions(
            data.data.map(item => {
              return {
                value: item.id,
                label: item.attributes.category_of_employment
              }
            })
        )
    })
    .catch(err => console.log(err));
    }, []); 

  const [memberships, setMemberships] = useState([[]]);
  
  useEffect(() => {
    fetch([VARIABLES.fetchBaseUrl, "api/political-parties"].join('/'))
    .then(res => res.json())
    .then(data => {
        setMemberships(
            data.data.map(item => {
              return {
                value: item.id,
                label: item.attributes.political_party
              }
            })
        )
    })
    .catch(err => console.log(err));
    }, []); 

  const [organizations, setOrganizations] = useState([[]]);
  
  useEffect(() => {
    fetch([VARIABLES.fetchBaseUrl, "api/organizational-and-politicals"].join('/'))
    .then(res => res.json())
    .then(data => {
        setOrganizations(
            data.data.map(item => {
              return {
                value: item.id,
                label: item.attributes.organizational_and_political
              }
            })
        )
    })
    .catch(err => console.log(err));
    }, []); 
    
    const [leadership, setLeaderships] = useState([[]]);
  
    useEffect(() => {
      fetch([VARIABLES.fetchBaseUrl, "api/organizational-roles"].join('/'))
      .then(res => res.json())
      .then(data => {
          setLeaderships(
              data.data.map(item => {
                return {
                  value: item.id,
                  label: item.attributes.organization_role
                }
              })
          )
      })
      .catch(err => console.log(err));
      }, []); 

      const [plank, setPlanks] = useState([[]]);
  
      useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, "api/nwc-planks?sort[0]=plank"].join('/'))
        .then(res => res.json())
        .then(data => {
            setPlanks(
                data.data.map(item => {
                  return {
                    value: item.id,
                    label: item.attributes.plank
                  }
                })
            )
        })
        .catch(err => console.log(err));
        }, []); 

  const sexualOrientation = [
    { value: "Bisexual", label: "Bisexual" },
    { value: "Heterosexual", label: "Heterosexual" },
    { value: "Lesbian", label: "Lesbian" },
  ];

  const {
    register, 
    handleSubmit,
    formState: {errors},
    reset


  } = useForm()

  const [data, setData] = useState([])

  async function onSubmit(data) {
    console.log(data)
    const query = qs.stringify({
      filters: {
        $or: 
        {
          [0]: data,
        }
      },
      populate: '*',
    }, {
      encodeValuesOnly: true, // prettify URL
    });
    console.log('query', query)
    const response = await axios.get(`${VARIABLES.REACT_APP_API_URL}/nwc-participants?${query}`);
    console.log(response)
    setData(response.data.data)
  }

  const clearForm = () => {
    reset();
    setData([])
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
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Delegate at the NWC </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Alternate at the NWC </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Delegate-at-Large </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Ford National Commissioner </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Carter National Commissioner </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />State Delegation Chair </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Official Observer </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Journalists Covering the NWC </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Notable Speaker </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Paid staff member</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />volunteer </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />exhibitor</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />torch relay runner </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" /> international dignitary</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Unofficial Observer </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Other </label>
                  </div> 
                </div>
              </div>
            </div>    
            <div label="Plank position">
              <div className="advancedSearch_form">
                    <div className="advancedSearch_container">
                      <h1> Select one or more Planks: </h1>
                      <div className="item">
                        <div className="advancedSearch_form-control">
                        <Select
                        isMulti
                        options={plank} /> 
                        </div>
                      </div>
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
                <input type="checkbox" />under 30 </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />30-45 </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />45-60 </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />over 60 </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> Region</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                  <select> </select> </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> State/territory</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                  <Select
                  isMulti
                  options={stateOptions} /> </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> place of birth</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> city of residence in 1977</h1>
                <div className="item_EDU">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label> 
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
                <input type="checkbox" {...register('marital_classification')}/>partnered </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" {...register('marital_classification')} />divorced</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" {...register('marital_classification')}/>widowed</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" {...register('marital_classification')}/>unknown</label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1>name of spouse</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>                
                </div>
              </div>
              
              <div className="advancedSearch_container">
                <h1> number of children</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" />No children </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />1-3 </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />4 or more </label>
                </div>
              </div>
              
              <div className="advancedSearch_container">
                <h1> religion</h1>
                <div className="item_DEMO">
                  <div className="advancedSearch_form-control">
                  <Select
                  isMulti
                  options={religions}                                     
                  /></div>
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
                  <Select
                  options={sexualOrientation} 
                  />  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1>race and ethnicity</h1>
                <div className="item_EDU">
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Asian American/Pacific Islander </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Black</label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Hispanic </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Native American/American Indian </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />White </label>
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
                <input type="checkbox" value="some high school" {...register(`highest_level_of_education_attained` )} />Some high school </label>
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
                <input type="checkbox" />Yes </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> job/profession</h1>
                <div className="item">
                  <div className="advancedSearch_form-control">
                  <Select
                  isMulti
                  options={professions} /> 
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> job/profession keyword search</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> income level</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Low Income </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />Medium Income </label>
                <label className="advancedSearch_form-control">
                <input type="checkbox" />High Income </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> spouse's job/profession</h1>
                <div className="item">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
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
                  <input type="checkbox" />City </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />County </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />State </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />Federal </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />None </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> jurisdiction of political offices sought but lost </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />City </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />County </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />State </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />Federal </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />None </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices sought but lost</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> spouse/partner's political offices held </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />Yes </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />No </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> political party membership</h1>
                <div className="item_ELEC">
                  <div className="advancedSearch_form-control">
                  <Select
                  options={memberships} /> 
                  </div>
                </div>
              </div>
              <div className="advancedSearch_container">
                <h1> name of political offices spouse held</h1>
                <div className="item_ELEC">
                <label className="advancedSearch_form-control">
                <input type="text" /> </label>
                </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> identified as a feminist</h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />Yes </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />No </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />Unknown </label>
                  </div>
              </div>
              <div className="advancedSearch_container">
                  <h1> Commission on the status of women </h1>
                  <div className="item_ELEC">
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />City </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />County </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />State </label>
                  <label className="advancedSearch_form-control">
                  <input type="checkbox" />President's Commission on the Status of Women </label>
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
              <div label="advocacy groups" >
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
              </div>

              <div label="organization name">
              <div className="advancedSearch_form">
                <div className="advancedSearch_container">
                  <h1> Select Organizations </h1>
                  <div className="item">
                    <div className="advancedSearch_form-control">
                    <Select
                    isMulti
                    options={organizations} /> 
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div label="leadership position">
                <div className="advancedSearch_form">
                  <div className="advancedSearch_container">
                    <h1> Select Leadership Role</h1>
                    <div className="item">
                      <div className="advancedSearch_form-control">
                      <Select
                      isMulti
                      options={leadership} /> 
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
          <button type="submit" value="Submit" className="advancedSearch_button_search"> Search </button>
          <button type="reset" value="Reset" className="advancedSearch_button_reset" onClick={clearForm}> Reset </button>
        </div>
        </div>
        <div className="advancedSearch">
            <Tabs>
                <div label="Chart View">
                    <table className="advancedTable">
                        <tr style={{background: "#cadfee"}}>
                            <th> NAME</th>
                            <th> state/territory</th>
                            <th> role</th>
                            <th> race/ethnicity</th>
                            <th> religion</th>
                            <th> education</th>
                            <th> political offices held</th>
                            <th> political party membership</th>
                        </tr>
                        {data.map((val) => {
                          return (
                        <tr key={val.id}>
                            <td> {val.attributes.first_name} {val.attributes.last_name} </td>
                            <td> {val.attributes.residence_in_1977.data.attributes.residence_in_1977}</td> 
                            <td> {val.attributes.role.data.map((e, index) => { return (index ? '/' : '' ) + e.attributes.role})} </td>
                            <td> {val.attributes.races.data.map((e, index) => { return (index ? '/' : '' ) + e.attributes.race})}</td>
                            <td> {val.attributes.religion}</td>
                            <td> {val.attributes.highest_level_of_education_attained} </td>
                            <td> {val.attributes.political_office_helds.data.map((e, index) => { return (index ? '/' : '' ) + e.attributes.political_office})} </td>
                            <td> {val.attributes.political_party_membership} </td>

                        </tr>
                          )
                        })}
                    </table> 
                </div>
                <div label="Map View">            
                </div>
            </Tabs>
            </div>
      </div>
      </form>
      
  )
}

export default AdvancedSearch
