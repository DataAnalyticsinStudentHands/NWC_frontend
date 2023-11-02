import React from 'react'
import stateTerritories from '../../assets/stateTerritories.json';
import Select from 'react-select';
import './StateSelect.scss'

const StateSelect = (props) => {

    const stateOptions = [] // Store states
    Object.values(stateTerritories).forEach((state) => {
        stateOptions.push({value: state.stateCode, label: state.state}) 
    })

    return (
        <Select
        isMulti
        options={stateOptions}
        onChange={props.onSelect}
        value={props.selectedOptions}
        placeholder="State/Territory"
        className="basic-multi-select"
        classNamePrefix="select"
      />
    )
}

export default StateSelect