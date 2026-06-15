import Select, { components } from 'react-select';

export const CheckboxOption = (props) => (
  <components.Option {...props}>
    <label style={{ flexGrow: 1 }}>{props.label}</label>
    <div style={{ width: '25rem', textAlign: 'right' }}> {/* Fixed width container for checkbox */}
        <input
        type="checkbox"
        checked={props.isSelected} // Keeps the checkbox checked when selected
        onChange={() => null} // Prevents triggering action on checkbox click
        style={{ marginLeft: '5rem', width: '20rem', height: '20rem' }} // Sets fixed size for checkbox
        />
    </div>
  </components.Option>
);

export const Multiselect = ({
  options,
  value,
  onChange,
  onBlur,
  name,
  placeholder = "Select...",
  styles = {},
}) => {
  const defaultStyles = {
    container: base => ({ ...base, width: 'max-content', minWidth: '15%' }),
    control: base => ({
      ...base,
      width: '240rem', // Set the width of the control (input area)
      maxWidth: '100%', // Prevent the width from growing beyond the container
      flexWrap: 'wrap',
      whiteSpace: 'normal',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? 'transparent' : base.backgroundColor,
      color: 'black',
      display: 'flex',
      alignItems: 'center',
    }),
    valueContainer: base => ({
      ...base,
      maxWidth: '300rem',
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
    }),
    multiValue: base => ({
      ...base,
      backgroundColor: '#e2e2e2',
    }),
    placeholder: base => ({
      ...base,
      fontFamily: 'Montserrat, sans-serif',  // Change to Montserrat font
      fontSize: '16px',  // Adjust font size as needed
      color: '#888',  // Adjust color if needed
    }),
    ...styles,
  };

  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option: CheckboxOption }}
      styles={defaultStyles}
      classNamePrefix="select"
      name={name}
    />
  );
};
