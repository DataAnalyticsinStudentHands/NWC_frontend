import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ primary, size, label, ...props }) => {
    let scale = 1
    size === 'sm' ? scale = 0.75 
    : size === 'lg' ? scale = 1.5 
    : size === 'md' ? scale = 1
    : scale = 1
    const styles = {
        fontSize: `${scale * 1}em`,
        padding: `${scale * 0.25}em ${scale * 1}em`,
        color:'white',
        backgroundColor: primary ? '#00597C' : '#B22524',
        borderRadius: `${scale * 2}em`,
    }
    return (
      <button
        type="button"
        style={styles}
        {...props}
      >
        {label}
      </button>
    );
  };
  
  Button.propTypes = {
    primary: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };
  
  Button.defaultProps = {
    primary: false,
    size: 'md',
    onClick: undefined,
  };
  