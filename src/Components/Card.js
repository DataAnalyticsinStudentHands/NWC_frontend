import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "./Typography";

export const Card = ({ img, title, spacing, link, ...props }) => {
	const style = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: `${spacing * 0.5}em`,
	};
	return (
		<>
			{link ? (
				<div {...props} style={style} className="Card">
					<Link to={link} {...props} style={style}>
						<img src={img} alt={`${title} icon`} />
					</Link>
					<Typography type="heading-3">{title}</Typography>
				</div>
			) : (
				<div {...props} style={style} className="Card">
					<img src={img} alt={`${title} icon`} />
					<Typography type="heading-3">{title}</Typography>
				</div>
			)}
		</>
	);
};
Card.propTypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	spacing: PropTypes.number,
};
Card.defaultProps = {
	img: "https://via.placeholder.com/150",
	title: "Card",
	spacing: 0,
};
