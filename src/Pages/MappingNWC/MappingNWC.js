import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import * as qs from 'qs';

import Map from "./Map";
import VARIABLES from "../../config/.env.js";
import './MappingNWC.css'

import button from "./res/button.png";
import component119 from './res/component119.png';

function MappingNWC() {

  const { fetchBaseUrl } = VARIABLES;

  // one state to hold the regular page content loaded from Strapi
  const [state, setState] = useState({
    banner_text: '',
    bannerimage_credit: '',
    bannerimagecredit_more: '',
    basicsearch_text: ''
  });
  // 2nd state to hold map data 
  const [maps, setMap] = useState([]);
  // 3rd state for form search by name
  const { register: registerSearch, handleSubmit: handleSubmitSearch, formState: { errors: errorsSearch } } = useForm();
  // 4th state for form checkboxes
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  // 5th state form multi-select
  const [selectedOptions, setSelectedOptions] = useState([]);

  // submit text search query
  const onSubmitSearch = (data) => {
    var searchQuery = data.searchText;

    fetch([VARIABLES.fetchBaseUrl, `participants?first_name_contains=${searchQuery}`].join('/'))
      .then(response => response.json())
      .then(data => {
        setMap(data);
      })
      .catch(err => console.log(err));
  }

  // submit basic search query
  const onSubmit = data => {
    var query_array = [];

    //build the query for state
    console.log(selectedOptions)

    if (selectedOptions) {
      selectedOptions.forEach(state => {
        query_array.push({ 'state': state.value });
      });

    }

    //build the query for: Roles
    if (data.delegate_alternate)
      query_array.push({ 'nwc_roles.delegate_at_the_nwc': 1 });

    if (data.national_commissioner) {
      query_array.push({ 'nwc_roles.ford_national_commissioner': 1 });
      query_array.push({ 'nwc_roles.carter_national_commissioner': 1 });
    }

    if (data.torch_relay_runner) {
      query_array.push({ 'nwc_roles.torch_relay_runner': 1 });
    }

    if (data.notable_speaker) {
      query_array.push({ 'nwc_roles.notable_speaker': 1 });
    }

    if (data.journalists_covering_the_nwc) {
      query_array.push({ 'nwc_roles.journalists_covering_the_nwc': 1 });
    }

    if (data.staff_volunteer) {
      query_array.push({ 'nwc_roles.volunteer': 1 });
      query_array.push({ 'nwc_roles.paid_staff_member': 1 });
    }

    if (data.international_dignitary) {
      query_array.push({ 'nwc_roles.international_dignitary': 1 });
    }

    if (data.official_observer) {
      query_array.push({ 'nwc_roles.official_observer': 1 });
    }

    if (data.asian_americanpacific_islander) {
      query_array.push({ 'nwc_races.asian_americanpacific_islander': 1 });
    }

    //build the query for: Race & Ethnicity
    if (data.black) {
      query_array.push({ 'nwc_races.black': 1 });
    }

    if (data.hispanic) {
      query_array.push({ 'nwc_races.hispanic': 1 });
    }

    if (data.native_americanamerican_indian) {
      query_array.push({ 'nwc_races.native_americanamerican_indian': 1 });
    }

    if (data.white) {
      query_array.push({ 'nwc_races.white': 1 });
    }

    //build the query for: Religion
    if (data.agnostic) {
      query_array.push({ 'religion': 'agnostic' });
    }

    if (data.atheist) {
      query_array.push({ 'religion': 'atheist' });
    }

    if (data.catholic) {
      query_array.push({ 'religion': 'catholic' });
    }

    if (data.christian) {
      query_array.push({ 'religion': 'jewish' });
    }

    if (data.eastern) {
      query_array.push({ 'religion': 'eastern' });
    }

    if (data.jewish) {
      query_array.push({ 'religion': 'jewish' });
    }

    if (data.mormon) {
      query_array.push({ 'religion': 'mormon' });
    }

    if (data.muslim) {
      query_array.push({ 'religion': 'muslim' });
    }

    if (data.unknown) {
      query_array.push({ 'religion': 'unknown' });
    }

    //build the query for: Higest Level of Education
    if (data.highschool) {
      query_array.push({ 'highest_level_education': 'some_highschool' });
      query_array.push({ 'highest_level_education': 'high_school_diploma' });
    }

    if (data.college) {
      query_array.push({ 'highest_level_education': 'some_college' });
      query_array.push({ 'highest_level_education': 'college_degree' });
    }

    if (data.graduate) {
      query_array.push({ 'highest_level_education': 'graduate_professional_degree' });
    }

    //build the query for: Political offices held level
    if (data.city_level) {
      query_array.push({ 'jurisdiction_level_politicals.city_level': 1 });
    }

    if (data.county_level) {
      query_array.push({ 'jurisdiction_level_politicals.county_level': 1 });
    }

    if (data.state_level) {
      query_array.push({ 'jurisdiction_level_politicals.state_level': 1 });
    }

    if (data.federal_level) {
      query_array.push({ 'jurisdiction_level_politicals.federal_level': 1 });
    }

    //build the query for: Political Party membership
    if (data.democratic) {
      query_array.push({ 'political_parties.democratic': 1 });
    }

    if (data.republican) {
      query_array.push({ 'political_parties.republican': 1 });
    }

    if (data.third) {
      query_array.push({ 'political_parties.american_independent': 1 });
      query_array.push({ 'political_parties.black_panther': 1 });
      query_array.push({ 'political_parties.cpusa': 1 });
      query_array.push({ 'political_parties.conservative_party_of_new_york': 1 });
      query_array.push({ 'political_parties.dc_statehood': 1 });
      query_array.push({ 'political_parties.liberal_party_of_new_york': 1 });
      query_array.push({ 'political_parties.minnesota_dfl': 1 });
      query_array.push({ 'political_parties.north_dakota_dnl': 1 });
      query_array.push({ 'political_parties.peace_and_freedom': 1 });
      query_array.push({ 'political_parties.raza_unida': 1 });
      query_array.push({ 'political_parties.socialist_party_usa': 1 });
      query_array.push({ 'political_parties.socialist_workers': 1 });
    }

    //build the query for: Stance on ERA
    if (data.for) {
      query_array.push({ 'era_stance.for': 1 });
    }

    if (data.against) {
      query_array.push({ 'era_stance.against': 1 });
    }

    const query = qs.stringify({
      _where:
      {
        _or: query_array
      }
    },
      { encode: false });

    fetch(`${fetchBaseUrl}/participants?${query}`)
      .then(res => res.json())
      .then(data => {
        setMap(maps => data);
      })
      .catch(err => console.log(err));
  }

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

  //reset form fields and map data
  const onClear = () => {
    reset({
      delegate_alternate: 0,
      national_commissioner: 0,
      notable_speaker: 0,
      journalists_covering_the_nwc: 0,
      torch_relay_runner: 0,
      staff_volunteer: 0,
      international_dignitary: 0,
      official_observer: 0,
      asian_americanpacific_islander: 0,
      black: 0,
      hispanic: 0,
      native_americanamerican_indian: 0,
      white: 0,
      agnostic: 0,
      atheist: 0,
      catholic: 0,
      christian: 0,
      eastern: 0,
      jewish: 0,
      mormon: 0,
      muslim: 0,
      unknown: 0,
      none_of_the_above: 0,
      highschool: 0,
      college: 0,
      graduate: 0,
      democratic: 0,
      republican: 0,
      third: 0,
      city_level: 0,
      county_level: 0,
      state_level: 0,
      federal_level: 0,
      for: 0,
      against: 0,
      selectInputRef: 0
    });
    setSelectedOptions(null);
    setMap([])
  }

  // updates from multi-select
  const onSelect = (options) => {
    setSelectedOptions(options);
  };

  // grab page data from strapi on mount
  useEffect(() => {
    fetch(`${fetchBaseUrl}/content-mapping-nwc`)
      .then(res => res.json())
      .then(data => {
        setState({
          banner_text: data.Banner_text,
          bannerimage_credit: data.BannerImage_Credit,
          bannerimagecredit_more: data.BannerImageCredit_more,
          basicsearch_text: data.BasicSearch_Text
        });
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  return (
    <div className="mappingNWC">

      {/**BANNER */}
      <div className="mappingNWCBanner">
        <img src={button} className="mappingNWC_button" alt="_" />
        <div className="mappingNWC_card">
          <p>
            {state.banner_text}
          </p>
        </div>
        <div className='mappingNWC_imgcontainer'>
        <img src={component119} className="mappingNWC_component119" alt="_" />
        <div className="mappingNWC_credit" title={state.bannerimagecredit_more}>
          <p>PHOTO BY {state.bannerimage_credit}</p>
        </div>
        
        
        </div>
        
      </div>

      {/**SEARCH */}
      <div className="mappingNWCSearch">
        <h1>HOW TO SEARCH this DATA</h1>
        <hr></hr>
        <h2>BASIC SEARCH</h2>
        <p>{state.basicsearch_text}</p>

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
              <label className="form-control">
                <input type="checkbox" {...register("delegate_alternate")} />DELEGATES/ALTERNATES</label>
              <label className="form-control">
                <input type="checkbox" {...register("national_commissioner")} />NATIONAL COMMISSIONERS</label>
              <label className="form-control">
                <input type="checkbox" {...register("notable_speaker")} />NOTABLE SPEAKERS</label>
              <label className="form-control">
                <input type="checkbox" {...register("journalists_covering_the_nwc")} />JOURNALISTS</label>
              <label className="form-control">
                <input type="checkbox" {...register("torch_relay_runner")} />TORCH RELAY RUNNERS</label>
              <label className="form-control">
                <input type="checkbox" {...register("staff_volunteer")} />STAFF/VOLUNTEERS</label>
              <label className="form-control">
                <input type="checkbox" {...register("international_dignitary")} />INTERNATIONAL DIGNITARIES</label>
              <label className="form-control">
                <input type="checkbox" {...register("official_observer")} />OFFICIAL OBSERVERS</label>
            </div>
            <div className='panel'>
              <p>RACE AND ETHNICITY IDENTIFIERS</p>
              <label className="form-control">
                <input type="checkbox" {...register("asian_americanpacific_islander")} />ASIAN AMERICAN/PACIFIC ISLANDER</label>
              <label className="form-control">
                <input type="checkbox" {...register("black")} />BLACK</label>
              <label className="form-control">
                <input type="checkbox" {...register("hispanic")} />HISPANIC</label>
              <label className="form-control">
                <input type="checkbox" {...register("native_americanamerican_indian")} />NATIVE AMERICAN/ AMERICAN INDIAN</label>
              <label className="form-control">
                <input type="checkbox" {...register("white")} />WHITE</label>
            </div>
            <div className='panel'>
              <p>RELIGION</p>
              <label className="form-control">
                <input type="checkbox" {...register("agnostic")} />AGNOSTIC</label>
              <label className="form-control">
                <input type="checkbox" {...register("atheist")} />ATHEIST</label>
              <label className="form-control">
                <input type="checkbox" {...register("catholic")} />CATHOLIC</label>
              <label className="form-control">
                <input type="checkbox" {...register("christian")} />CHRISTIAN NON CATHOLIC</label>
              <label className="form-control">
                <input type="checkbox" {...register("eastern")} />EASTERN RELIGIONS</label>
              <label className="form-control">
                <input type="checkbox" {...register("jewish")} />JEWISH</label>
              <label className="form-control">
                <input type="checkbox" {...register("mormon")} />MORMON</label>
              <label className="form-control">
                <input type="checkbox" {...register("muslim")} />MUSLIM</label>
              <label className="form-control">
                <input type="checkbox" {...register("unknown")} />UNKNOWN</label>
              <label className="form-control">
                <input type="checkbox" {...register("none_of_the_above")} />NONE OF THE ABOVE</label>
            </div>
            <div className='panel'>
              <p>HIGHEST LEVEL OF EDUCATION</p>
              <label className="form-control">
                <input type="checkbox" {...register("highschool")} />HIGH SCHOOL</label>
              <label className="form-control">
                <input type="checkbox" {...register("college")} />COLLEGE</label>
              <label className="form-control">
                <input type="checkbox" {...register("graduate")} />GRADUATE/PROFESSIONAL</label>
            </div>
            <div className='panel'>
              <p>POLITICAL OFFICES HELD</p>
              <label className="form-control">
                <input type="checkbox" {...register("city_level")} />CITY LEVEL</label>
              <label className="form-control">
                <input type="checkbox" {...register("county_level")} />COUNTY LEVEL</label>
              <label className="form-control">
                <input type="checkbox" {...register("state_level")} />STATE LEVEL</label>
              <label className="form-control">
                <input type="checkbox" {...register("federal_level")} />FEDERAL LEVEL</label>
            </div>
            <div className='panel'>
              <p>POLITICAL PARTY MEMBERSHIP</p>
              <label className="form-control">
                <input type="checkbox" {...register("democratic")} />DEMOCRATIC PARTY</label>
              <label className="form-control">
                <input type="checkbox" {...register("republican")} />REPUBLICAN PARTY</label>
              <label className="form-control">
                <input type="checkbox" {...register("third")} />THIRD PARTY</label>
            </div>
            <div className='panel'>
              <p>EQUAL RIGHTS AMENDMENT STANCE</p>
              <label className="form-control">
                <input type="checkbox" {...register("for")} />FOR</label>
              <label className="form-control">
                <input type="checkbox" {...register("against")} />AGAINST</label>
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
            <input type="text" placeholder="SEARCH" {...registerSearch("searchText")} />
            <button type="submit" className="mappingNWCSearch_icon"></button>
          </form>
        </div>
      </div>
      {/**MAP */}
      <Map map_data={maps} />

    </div>
  )
}

export default MappingNWC
