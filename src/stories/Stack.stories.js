import {Stack} from "../Components/Stack"

export default {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    numberOfChildren: { control: "number" },
    spacing: { control: "number" },
    wrap: { control: "boolean" },
    direction: { control: "radio", options: ["row", "column"] },
    justifyContent: {
      control: "radio",
      options: ["space-around", "space-between", "center", "flex-start", "flex-end"],
    },
    margin: { control: "text" },
  }
}

const Template = ({ numberOfChildren = 4 , ...args }) => (
  <Stack {...args}>
    {[...Array(numberOfChildren).keys()].map(n => (
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {n + 1}
      </div>
    ))}
  </Stack>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  direction: "row",
  wrap: false,
}

export const Vertical = Template.bind({})
Vertical.args = {
  direction: "column",
}

export const NoSpacing = Template.bind({})
NoSpacing.args = {
  spacing: 0,
  wrap: false,
}

export const WrapOverflow = Template.bind({})
WrapOverflow.args = {
  numberOfChildren: 40,
  spacing: 2,
  wrap: true,
}

