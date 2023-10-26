import React from "react";
import PropTypes from "prop-types";
import Colors from "../assets/colors.json"

export const Typography = ({ 
    type, children, text,
    color, bgColor,
    borderPosition,
    paddingTB, paddingLR,
    textTransform,
    ...props }) => {

    const styles = {
        color: Colors[color],
        backgroundColor: Colors[bgColor] || "transparent",
        padding: `${paddingTB}em ${paddingLR}em`,
        [`border${borderPosition}`]: `0.3em solid #b32525`,
        textTransform: textTransform.toLowerCase(),
    }
    props.style && Object.assign(styles, props.style);

	return(
        <div className={type} style={styles}>
            {children ?? text}
        </div>
    );
};
Typography.propTypes = {
    text: PropTypes.string,
	type: PropTypes.oneOf([
        "title",
        "heading-1",
        "heading-2",
        "heading-3",
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
    paddingTB: PropTypes.number,
    paddingLR: PropTypes.number,
    textTransform: PropTypes.oneOf([
        "None",
        "Uppercase",
        "Lowercase",
        "Capitalize",
    ]),
};
Typography.defaultProps = {
    text: "Typography",
    type: "body-text",
    color: "primary.other.black",
    bgColor: "transparent",
    borderPosition: "None",
    paddingTB: 0.2,
    paddingLR: 0.4,
    textTransform: "None",
};
