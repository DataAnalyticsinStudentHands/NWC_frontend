import { Button } from '../Components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    
  },
};
const Template = (args) => {
  return(
      <Button {...args} />
  )
};
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Button',
  size: 'md',
};

// export const Base = {
//   args: {
//     variant: 'primary',
//     label: 'Button',
//     size: 'md',
//   },
// };
