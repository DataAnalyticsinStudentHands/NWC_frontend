import React from 'react';
import PropTypes from 'prop-types';

import colors from "../assets/color.config.json"

const colorVariants = {
    primary: colors.primary.dark.red,
    secondary: colors.primary.light.blue,
    tertiary: colors.primary.medium.blue,
}
const sizeScale = {
    sm: '1',
    md: '1.25',
    lg: '1.5',
}
export const Button = ({ variant, size, label, ...props }) => {

    const styles = {
        fontSize: `${sizeScale[size] * 1}em`,
        padding: `${sizeScale[size] * 0.25}em ${sizeScale[size] * 1}em`,
        border: `${colorVariants[variant]} solid ${sizeScale[size] * 0.1}em`,
        backgroundColor: colorVariants[variant],
        borderRadius: `${sizeScale[size] * 2}em`,
        cursor: 'pointer',
    }
    
    return (
      <div style={{fontSize:"1vw"}}>
        <button
          type="button"
          className={`btn-${variant}`}
          style={styles}
          {...props}
        >
          {label}
      </button>
      </div>
    );
  };
  
  Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };
  
  Button.defaultProps = {
    variant: false,
    size: 'lg',
    onClick: undefined,
  };
  