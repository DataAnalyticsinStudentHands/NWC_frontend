import { Stack } from "../Components/Stack.js";
import TypographyObj from "../assets/font.config.json";

import { Typography } from "../Components/Typography.js";

export default {
	title: "Demo/Typrography",
	component: Typography,
};


const Template = () => {
	return (
		// <Stack direction="column" spacing={6} margin='1em 2em'>

		// 	{/* {
		// 		Object.entries(TypographyObj).map(([key, value]) => {
		// 			return (
		// 				<table style={{
		// 					width: '100%',
		// 					// borderCollapse: 'initial',
		// 					// border: '1px solid black',
						
		// 				}}>
		// 					<tr>
		// 						<td width={"40%"}> 
		// 							<Typography type={key} style={{textTransform: 'capitalize',}}>{key}</Typography>
		// 						</td>
		// 						{Object.values(value).map((value) => {
		// 							return (
		// 								<td width={"15%"}
		// 								>
		// 									<Typography>{value}</Typography>
		// 								</td>
		// 							)
		// 						})}
		// 					</tr>
		// 				</table>
		// 			);
		// 		})
		// 	} */}

		// </Stack>
		<table style={{
			width: '100%',
		}}>
			<thead>
				<tr>
					<th>
						<Typography type="heading-2" style={{textTransform: 'capitalize',}}>
						Typography
						</Typography>
					</th>
					<th>
						<Typography type="heading-2" style={{textTransform: 'capitalize',}}>
						Font Family
						</Typography>
					</th>
					<th>
						<Typography type="heading-2" style={{textTransform: 'capitalize',}}>
						Size / vw
						</Typography>
					</th>
					<th>
						<Typography type="heading-2" style={{textTransform: 'capitalize',}}>
						style
						</Typography>
					</th>
					<th>
						<Typography type="heading-2" style={{textTransform: 'capitalize',}}>
						Weight
						</Typography>	
					</th>
				</tr>
			</thead>
			<tbody>
				{
					Object.entries(TypographyObj).map(([key, values]) => {
						return (
							<tr>
								<td style={{
									padding: '1vw 0',
								}}>
									<Typography type={key} style={{textTransform: 'capitalize',}}>{key}</Typography>
								</td>
								{Object.values(values).map((value) => {
									return (
										<td>
											<Typography style={{
												fontFamily:TypographyObj[key]['font-family'],
												fontWeight:TypographyObj[key]['font-weight'],
												fontStyle:TypographyObj[key]['font-style'],
											}}>{value}</Typography>
										</td>
									)
								})}
							</tr>
						);
					})
				}
			</tbody>
		</table>
	);

};

export const Base = Template.bind({});
