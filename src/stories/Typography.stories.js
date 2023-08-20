import { Typography } from "../Components/Typography";

export default {
    title: "Components/Typography",
    component: Typography,
    tags: ["autodocs"],
    argTypes: {
        type: { control: "radio", options: ["title", "h1",'h2', "h3", "h4", "h5",'q1','q2','sb', "p1",'p2', 'body-text', 'caption', 'overline'] },
    },
}

export const Base = {
    args: {
        type: "p1",
    }
}