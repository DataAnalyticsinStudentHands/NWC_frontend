import PropTypes from 'prop-types';

const Tab = ({ activeTab, label, onClick }) => {
  const className = activeTab === label ? 'tab-list-item tab-list-active' : 'tab-list-item';

  const handleClick = () => {
    console.log(label);
    onClick(label);
  };

  return (
    <li className={className} onClick={handleClick}>
      {label}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
