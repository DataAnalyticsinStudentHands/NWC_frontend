import { Color } from "./Color.js";
import { Stack } from "../Components/Stack.js";
import ColorObj from "../assets/color.config.json";
import { Typography } from "../Components/Typography.js";
export default {
	title: "Demo/Color",
	component: Color,
};

const Template = () => {
	return (
		<Stack direction="column" spacing={6} margin='1em 2em'>
			{Object.entries(ColorObj).map(([key, value]) => {
				return (
					<Stack direction='column' spacing={4}>
						<Typography type="heading-1" style={{textTransform: 'capitalize',}}>{key} Colors</Typography>
						<Stack direction='column' justifyContent='flex-start'>
							{Object.entries(value).map(([key, value]) => {
								return (
                                    <Stack direction='column' spacing={3} margin='0 0 0 3em'>
                                        <Typography type="heading-2" style={{textTransform: 'capitalize',}}>
											{key}
										</Typography>
                                        <Stack justifyContent='flex-start' margin='0 0 0 3em' wrap>
                                            {Object.entries(value).map(([key, value]) => {
                                                return (
                                                    <Color color={value} text={key} />
                                                )
                                            })}
                                        </Stack>

                                    </Stack>
                                )
							})}
						</Stack>
					</Stack>
				);
			})}
		</Stack>
	);
};

export const Base = Template.bind({});
