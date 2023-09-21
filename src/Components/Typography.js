import React from "react";
import PropTypes from "prop-types";
import Colors from "../assets/colors.json"

export const Typography = ({ 
    type, children,
    color, bgColor,
    borderPosition, 
    ...props }) => {

    const styles = {
        color: Colors[color],
        backgroundColor: Colors[bgColor] || "transparent",
        // padding: "0.2em 0.4em",
        [`border${borderPosition}`]: `0.3em solid #b32525`,
        
    }
    props.style && Object.assign(styles, props.style);

	return(
        <div className={type} style={styles}>
            {children}
        </div>
    );
};
Typography.propTypes = {
	type: PropTypes.oneOf([
        "title",
        "heading-1",
        "heading-2",
        "quote-1",
        "paragraph-1",
        "paragraph-2",
        "body-text",
        "caption",
	]),
    color: PropTypes.oneOf(Object.keys(Colors)),
    bgColor: PropTypes.oneOf(
        ['transparent', ...Object.keys(Colors)]
    ),
    borderPosition: PropTypes.oneOf([
        "None",
        "Left",
        "Right",
    ]),
};
Typography.defaultProps = {
    type: "body-text",
    children: "Typography",
    color: "primary.other.black",
    bgColor: "transparent",
    borderPosition: "None",
};
