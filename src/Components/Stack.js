import React from "react"
import PropTypes from "prop-types"

export const Stack = ({ children, spacing, direction, wrap, justifyContent, margin, ...props }) => {
  const style = {
    display: "flex",
    gap: `${spacing * 0.5}em`,
    flexWrap: wrap ? "wrap" : "nowrap",
    flexDirection: direction,
    justifyContent: justifyContent,
    margin: margin,
  }
  props.style && Object.assign(style, props.style)
  return <div {...props} style={style}>{children}</div>

};
Stack.prototype = {
  spacing: PropTypes.number,
  wrap: PropTypes.bool,
  direction: PropTypes.oneOf(["row", "column"]),
  justifyContent: PropTypes.oneOf(["space-around", "space-between", "center", "flex-start", "flex-end"]),
  margin: PropTypes.string,
}
Stack.defaultProps = {
  spacing: 2,
  wrap: false,
  direction: "row",
  justifyContent: "space-around",
  margin: "0 0",
}