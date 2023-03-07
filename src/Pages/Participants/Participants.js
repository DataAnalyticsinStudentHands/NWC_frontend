import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
import './Participants.css';
import VARIABLES from '../../config/.env';
import { CSVLink } from "react-csv";
import Select from 'react-select';

function Participants() {
    const [participants, setParticipants] = useState([]);
    // state for select
    const [selectedValue, setSelectedValue] = useState(null);
    const listOfPartcipants = useRef([])
    // Pull Strapi Data
    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, 'api/list-of-participants?sort[0]=LastName'].join('/')) // need to figure out how to sort in query, but for another day </3
            .then(res => res.json())
            .then(data => {
                listOfPartcipants.current = data.data
                setParticipants(data.data)
            })
            .catch(err => console.log(err));
    }, []); // eslint-disable-line

    // handle onChange event of the dropdown
    // const handleChange = selectedOption => {
    //     setSelectedValue(selectedOption.label);
    //     fetch([VARIABLES.fetchBaseUrl, `api/list-of-participants?[filters][States][$eq]=${selectedValue}`].join('/')) // need to figure out how to sort in query, but for another day </3
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('line 30', data.data);
    //             setParticipants(Array.isArray(data.data) ? data.data : [data.data])
    //         })
    //         .catch(err => console.log(err));
    // }

    const handleChange = e => {
        setSelectedValue(e.label);
        let i = 0
        let newList = []
        if(selectedValue === 'All States'){
            setParticipants(listOfPartcipants.current)
            console.log('line 31')
        }else{
            while(i < listOfPartcipants.current.length){
                if(listOfPartcipants.current[i].attributes.States === selectedValue){
                    newList.push(listOfPartcipants.current[i])
                    console.log('line 37')
                }   
                i++
            }
            console.log('handle change')
            setParticipants(newList)
        }
        
        // setParticipants({value:newList}, function(){
        //     console.log('line 46', participants.value)
        // })
    }

    // adding USA list of states for select input
    const stateOptions = [
        {value:"ALL", label: "All States"},
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

    return (
        <div className="participants">
            {/**BACK LINK */}
            <div class='backToDiscover'>
                <Link to="/discover">&larr; BACK TO DISCOVER PAGE</Link>
            </div>

            <h1>List of NWC Participants</h1>
            <div className='participantsOptions'>
            
            {/**FILTER */}
            {/* <div className="participantsFilter"> */}
               <div className='participantsFilter'>
                <p>Filter by State: </p>
                <Select id='select'
                    options={stateOptions}
                    onChange={handleChange}
                    value={stateOptions.find(obj => obj.value === selectedValue)}
                    className="basic-multi-select participantsFilterSelect"
                    classNamePrefix="select"
                >
                    
                    
                </Select>
                </div>
                <CSVLink 
                    data={[
                        ["Last Name", "First Name", "State"],
                        ...participants.map(p => [p.attributes.LastName, p.attributes.FirstName, p.attributes.States]),
                    ]}
                    filename={`participants-${Date.now()}.csv`}
                >
                    Download CSV
                </CSVLink>
                {/* </div> */}
            </div>

            {/**LIST */}
            <div className="participantsList">
                
                <ul className='participantContainer'>
                {
                    participants.length === 0
                        ? "No Participants Found."
                        : participants.map(participant => <ul key={Math.random()}>{participant.attributes.LastName}, {participant.attributes.FirstName}, {participant.attributes.States}</ul>)
                }
                </ul>
            
            </div>
        </div>
    )
}

export default Participants
