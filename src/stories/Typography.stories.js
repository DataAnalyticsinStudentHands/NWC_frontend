import { Typography } from "../Components/Typography";

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
        ] },
        bgColor: { control: "radio", options: [
            "transparent",
            "Beige",
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
export const Heading3 = {
    args: {
        type: "heading-3",
    }
}
export const Heading4 = {
    args: {
        type: "heading-4",
    }
}
export const Heading5 = {
    args: {
        type: "heading-5",
    }
}
export const Quote1 = {
    args: {
        type: "quote-1",
    }
}
export const Quote2 = {
    args: {
        type: "quote-2",
    }
}
export const Subtitle2 = {
    args: {
        type: "subtitle-2",
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
export const Overline = {
    args: {
        type: "overline",
    }
}