import { Card } from "../Components/Card.js";

export default {
    title: "Components/Card",
    component: Card,
    parameters: {
        layout: 'centered',
      },
      tags: ['autodocs'],

    argTypes:{
        img: {control: "text", description: "Image URL"},
        title: {control: "text", description: "Text under the image"},
        spacing: { control: "number" },
    }
}
const Template = ({img, title, ...args}) => <Card img={img} title={title} {...args} />;

export const Default = Template.bind({});
Default.args = {
    img: "https://via.placeholder.com/150",
    title: "Card",
}

