import React from "react";
import { Typography } from "./Typography";
import { Stack } from "./Stack";
export const Color = ({ color, text }) => {
	return (
		<Stack direction="column" style={{width: "200px"}} spacing={0}>
			<div
				style={{
                    height: "150px",
					width: "150px",
					backgroundColor: color,
					color: "white",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}></div>
			<Typography type="caption" style={{fontWeight:'700', textTransform:'capitalize'}}>{text}</Typography>
			<Typography>{color}</Typography>
		</Stack>
	);
};
