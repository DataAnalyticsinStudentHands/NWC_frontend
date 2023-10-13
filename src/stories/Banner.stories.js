import { Banner } from '../Components/Banner.js';

export default {
    title: 'Components/Banner',
    component: Banner,
    tags: ['autodocs'],
    argTypes:{
        imgLeft: {control: "text", description: "Image URL"},
        text: {control: "text", description: "Text in the middle"},
        imgRight: {control: "text", description: "Image URL"},
        imgCredit: {control: "text", description: "Image Credit"},
        borderStyle: {control: "inline-radio", description: "Border Style", options: ["Corner", "Left", "Right"]},
        flexLeft:{
            control:"number",
            min: 0,
            max: 10,
            step: 1,
        },
        flexMiddle:{
            control:"number",
            min: 0,
            max: 10,
            step: 1,
        },
        flexRight:{
            control:"number",
            min: 0,
            max: 10,
            step: 1,
        }
    }
}

// const Template = ({imgLeft, text, imgRight,imgCredit, ...args}) => <Banner imgLeft={imgLeft} text={text} imgRight={imgRight} imgCredit={imgCredit} {...args} />;

export const Base =  {
    args:{
        imgCredit: "STH",
    }
}