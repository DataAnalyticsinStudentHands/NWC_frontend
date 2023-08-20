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
    }
}

const Template = ({imgLeft, text, imgRight,imgCredit, ...args}) => <Banner imgLeft={imgLeft} text={text} imgRight={imgRight} imgCredit={imgCredit} {...args} />;

export const Default = Template.bind({});

export const Test = Default.bind({});
Test.args = {
    imgCredit: "TTT",
}