import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
import './Participants.css';

import { CSVLink } from "react-csv";
import Select from 'react-select';
import BackToButton from '../../Components/Buttons/backTo';
import stateTerritories from '../../assets/stateTerritories.json';


function Participants() {
    const [participants, setParticipants] = useState([]);
    // state for select
    const [selectedValue, setSelectedValue] = useState(null);
    const listOfPartcipants = useRef([])
    // Pull Strapi Data
    useEffect(() => {
        fetch([process.env.REACT_APP_API_URL, 'api/list-of-participants?sort[0]=LastName'].join('/')) // need to figure out how to sort in query, but for another day </3
            .then(res => res.json())
            .then(data => {
                listOfPartcipants.current = data.data
                setParticipants(data.data)
            })
            .catch(err => console.log(err));
    }, []); // eslint-disable-line

    const handleChange = e => {
        
        let selectedValues = e.map(e=>{return e.label})
        setSelectedValue(selectedValues);
        const list = listOfPartcipants.current.filter(fullList => selectedValues.includes(fullList.attributes.States)).map(p=>{
            return p
        })
        selectedValues.length === 0?setParticipants(listOfPartcipants.current): setParticipants(list)
        
    }

    // adding USA list of states for select input
    const stateOptions = []
    Object.values(stateTerritories).forEach((state) => {
        stateOptions.push({value: state.stateCode, label: state.state}) 
    })
    return (
        <div className="participants">
            {/**BACK LINK */}
            {/* <div class='backToDiscover'>
                <Link to="/discover">&larr; BACK TO DISCOVER PAGE</Link>
            </div> */}
            <p className='backToDiscover'>
                <BackToButton name='Discover' link='/discover'/>
            </p>
            
            <h1>List of NWC Participants</h1>
            <div className='participantsOptions'>
            
            {/**FILTER */}
            {/* <div className="participantsFilter"> */}
               <div className='participantsFilter'>
                <p>Filter by State: </p>
                <Select id='select'
                    isMulti
                    options={stateOptions}
                    onChange={handleChange}
                    // onChange={onSelect}
                    // value={selectedOptions}
                    value={stateOptions.find(obj => obj.value === selectedValue)}
                    className="basic-multi-select"
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
