import stateTerritories from '../../assets/stateTerritories.json';
import Select from 'react-select';
import './StateSelect.scss'

export const StateSelect = (props) => {
    const stateOptions = Object.values(stateTerritories).map((state) => ({
    value: state.stateCode,
    label: state.state,
    isDisabled: props.states.length > 0 && !props.states.includes(state.stateCode),
  }));

    return (
        <Select
        isMulti
        options={stateOptions}
        onChange={props.onSelect}
        value={props.selectedOptions}
        placeholder="State/Territory"
        className={props.css}
        classNamePrefix="select"
      />
    )
}