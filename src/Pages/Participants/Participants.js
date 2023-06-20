import React, { useEffect, useState, useRef } from 'react'
import './Participants.css';
import VARIABLES from '../../config/.env';
import { CSVLink } from "react-csv";
import Select from 'react-select';
import BackToButton from '../../Components/Buttons/backTo';
import stateTerritories from '../../assets/stateTerritories.json';
import ListOf from '../../Components/ListOf/listOf';

function Participants() {
    // const [participants, setParticipants] = useState([]);
    // // state for select
    // const [selectedValue, setSelectedValue] = useState(null);
    // const [stateChoices, setStateChoices] = useState([]);
    // const [activeLetter, setActiveLetter] = useState(null);
    // const listOfPartcipants = useRef([])
    // // Pull Strapi Data
    // useEffect(() => {
    //     fetch([VARIABLES.fetchBaseUrl, 'api/list-of-participants?sort[0]=LastName'].join('/')) // need to figure out how to sort in query, but for another day </3
    //         .then(res => res.json())
    //         .then(data => {
    //             listOfPartcipants.current = data.data
    //             setParticipants(data.data)
    //         })
    //         .catch(err => console.log(err));
    // }, []); // eslint-disable-line

    // const handleChange = e => {
    //     let selectedValues = e.map(e=>{return e.label})
    //     setSelectedValue(selectedValues);
    //     const list = listOfPartcipants.current.filter(fullList => selectedValues.includes(fullList.attributes.States)).map(p=>{
    //         return p
    //     })
    //     setStateChoices(list)
    //     selectedValues.length === 0?setParticipants(listOfPartcipants.current): setParticipants(list)
    // }

    // // adding USA list of states for select input
    // const stateOptions = []
    // Object.values(stateTerritories).forEach((state) => {
    //     stateOptions.push({value: state.stateCode, label: state.state}) 
    // })
    // function handleLetterChange(letter){
    //     console.log('42', letter)
    //     setActiveLetter(letter)
    //     if(letter === 'reset'){
    //         setParticipants(listOfPartcipants.current)
    //         return
    //     }

    //     const letterList = stateChoices.length === 0?
    //     listOfPartcipants.current.filter(stateList => letter.includes(stateList.attributes.LastName[0].toLowerCase()))
    //     :stateChoices.filter(stateList => letter.includes(stateList.attributes.LastName[0].toLowerCase()))
    //     setParticipants(letterList)
    //}
    return (
        <div className="participants">
            {/**BACK LINK */}
            {/* <div class='backToDiscover'>
                <Link to="/discover">&larr; BACK TO DISCOVER PAGE</Link>
            </div> */}
            <p className='backToDiscover'>
                <BackToButton name='Discover' link='/discover'/>
            </p>
            
            <ListOf dataType='Participants' h1Title='Part'/>
        </div>
    )
}

export default Participants;
