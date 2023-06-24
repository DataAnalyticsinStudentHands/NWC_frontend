import React from 'react'
import './Participants.css';
import BackToButton from '../../Components/Buttons/backTo';
import ListOf from '../../Components/ListOf/listOf';

function Participants() {

    return (
        <div className="participants">
            {/**BACK LINK */}
            <p className='backToDiscover'>
                <BackToButton name='Discover' link='/discover'/>
            </p>
            
            <ListOf dataType='Participants' h1Title='Part'/>
        </div>
    )
}

export default Participants;
