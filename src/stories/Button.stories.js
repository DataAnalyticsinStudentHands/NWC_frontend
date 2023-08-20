import { Button } from '../Components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    
  },
};

export const Base = {
  args: {
    primary: true,
    label: 'Button',
    size: 'md',
  },
};
