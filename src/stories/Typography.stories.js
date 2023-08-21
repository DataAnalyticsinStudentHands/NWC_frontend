import { Typography } from "../Components/Typography";

export default {
    title: "Components/Typography",
    component: Typography,
    tags: ["autodocs"],
    parameters:{
        layout: "centered",
    },
    argTypes: {
        type: { control: "radio", options: [
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
    },
}

export const Base = {
    args: {
        type: "title",
    }
}