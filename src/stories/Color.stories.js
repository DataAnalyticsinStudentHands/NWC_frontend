import { Color } from "../Components/Color.js";
import { Stack } from "../Components/Stack.js";
import ColorObj from "../assets/color.config.json";

export default {
	title: "Color",
	component: Color,
};

const Template = () => {
	return (
		<Stack direction="column" spacing={6} margin='1em 2em'>
			{Object.entries(ColorObj).map(([key, value]) => {
				return (
					<Stack direction='column' spacing={4}>
						<h1 style={{textTransform: 'capitalize',}}>{key} Colors</h1>
						<Stack direction='column' justifyContent='flex-start'>
							{Object.entries(value).map(([key, value]) => {
								return (
                                    <Stack direction='column' spacing={3} margin='0 0 0 3em'>
                                        <h2 style={{textTransform: 'capitalize',}}>{key}</h2>
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
