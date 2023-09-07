import { Typography } from "../Components/Typography";
import NWCColors from "../assets/colors.json"
export default {
    title: "Components/Typography",
    component: Typography,
    tags: ["autodocs"],
    parameters:{
        layout: "centered",
    },
    argTypes: {
        type: { control: "select", options: [
            "title",
            "heading-1",
            "heading-2",
            "quote-1",
            "paragraph-1",
            "paragraph-2",
            "body-text",
            "caption",
        ]},
        color: { control: "select", options: [
            ...Object.keys(NWCColors)
        ]},
        bgColor: { control: "select", options: [
            'transparent', ...Object.keys(NWCColors)
        ]},

        borderPosition: { control: "inline-radio", options: [
            "None",
            "Left",
            "Right",
        ]}
    },
}

export const Base = {
    args: {
        type: "title",
    }
}
