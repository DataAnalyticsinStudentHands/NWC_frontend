import React from "react";
import PropTypes from "prop-types";

const ColorObj = {
    transparent: "transparent",
    Beige: "#FFF4E8",
    White: "#FFFFFF",
    Black: "#000000",
}

export const Typography = ({ type, children, bgColor, borderPosition }) => {
    const styles = {
        backgroundColor: ColorObj[bgColor],
        padding: "0.2em 0.4em",
        [`border${borderPosition}`]: "0.3em solid #b32525",
    }
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
        "heading-3",
        "heading-4",        
        "heading-5",
        "quote-1",
        "quote-2",
        "subtitle-2",
        "paragraph-1",
        "paragraph-2",
		"body-text",
		"caption",
		"overline",
	]),
    bgColor: PropTypes.oneOf([
        "transparent",
        "Beige",
    ]),
    borderPosition: PropTypes.oneOf([
        // "None",
        "Left",
        "Right",
    ]),
};
Typography.defaultProps = {
    type: "body-text",
    children: "Typography",
    bgColor: "transparent",
    borderPosition: "None",
};
