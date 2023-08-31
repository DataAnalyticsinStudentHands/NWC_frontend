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
        type: { control: "inline-radio", options: [
            "title",
            "heading-1",
            "heading-2",
            "quote-1",
            "paragraph-1",
            "paragraph-2",
            "body-text",
            "caption",
        ]},
        color: { control: "inline-radio", options: [
            ...Object.keys(NWCColors)
        ]},
        bgColor: { control: "inline-radio", options: [
            'transparent', ...Object.keys(NWCColors)
        ]},

        borderPosition: { control: "radio", options: [
            "None",
            "Left",
            "Right",
        ]}
    },
}

export const Title = {
    args: {
        type: "title",
    }
}
export const Heading1 = {
    args: {
        type: "heading-1",
    }
}
export const Heading2 = {
    args: {
        type: "heading-2",
    }
}
export const Quote1 = {
    args: {
        type: "quote-1",
    }
}

export const Paragraph1 = {
    args: {
        type: "paragraph-1",
    }
}
export const Paragraph2 = {
    args: {
        type: "paragraph-2",
    }
}
export const BodyText = {
    args: {
        type: "body-text",
    }
}
export const Caption = {
    args: {
        type: "caption",
    }
}