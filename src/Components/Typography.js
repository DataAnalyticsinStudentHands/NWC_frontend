import React from "react";
import PropTypes from "prop-types";

export const Typography = ({ type, children }) => {
	return(
        <div className={type}>
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
};
Typography.defaultProps = {
    type: "body-text",
    children: "Typography",
};
