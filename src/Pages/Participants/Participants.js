import React, { useEffect, useState, useRef } from 'react'
import './Participants.css';
import { CSVLink } from "react-csv";
import Select from 'react-select';
import BackToButton from '../../Components/Buttons/backTo';
import stateTerritories from '../../assets/stateTerritories.json';
import ListOf from '../../Components/ListOf/listOf';

function Participants() {

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
