import React from 'react'
import './Organizations.css'
import BackToButton from '../../Components/Buttons/backTo';
import ListOf from '../../Components/ListOf/listOf';

function Organizations() {

    return (
        <div className="organizations">
            {/*BACK LINK */}
            { <p className='backToDiscover'>
                <BackToButton name='Researching The NWC' link='/researchingNWC'/>
            </p> }
            <ListOf dataType='Organizations'/>
        </div>
    )
}

export default Organizations
