import { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              key={label}
              activeTab={activeTab}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) =>
          child.props.label === activeTab ? child.props.children : null
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Tabs;
