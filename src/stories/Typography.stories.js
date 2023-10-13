import { Typography } from "../Components/Typography";
import NWCColors from "../assets/colors.json";
export default {
	title: "Components/Typography",
	component: Typography,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		text: { control: "text" },
		type: {
			control: "select",
			options: [
				"title",
				"heading-1",
				"heading-2",
				"heading-3",
				"quote-1",
				"paragraph-1",
				"paragraph-2",
				"body-text",
				"caption",
			],
		},
		color: { control: "select", options: [
		    ...Object.keys(NWCColors)
		]},
		bgColor: {
			control: "select",
			options: ["transparent", ...Object.keys(NWCColors)],
		},

		borderPosition: {
			control: "inline-radio",
			options: ["None", "Left", "Right"],
		},
		paddingTB: { 
			control: "number",
		    min: 0,
			max: 2,
			step: 0.2,	 
		},
		paddingLR: {
			control: "number",
			min: 0,
			max: 2,
			step: 0.2,
		 },
		textTransform: {
			control: "inline-radio",
			options: ["None", "Uppercase", "Lowercase", "Capitalize"],
		},
	},
};

export const Base = {
	args: {
		type: "title",
	},
};
