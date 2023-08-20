import React from "react";
import PropTypes from "prop-types";

export const Typography = ({type, children }) => {
    return <div className={type}>{children}</div>;
};
Typography.propTypes = {
    type: PropTypes.oneOf(["title", "h1",'h2', "h3", "h4", "h5",'q1','q2','sb', "p1",'p2', 'body-text', 'caption', 'overline']),
}
Typography.defaultProps = {
    type: "p1",
}



