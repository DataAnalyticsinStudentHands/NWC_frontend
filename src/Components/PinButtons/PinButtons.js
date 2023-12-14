import './PinButtons.scss';
import { Link } from 'react-router-dom';
import { Stack } from '../../Components/Stack';

export const PinButtons = (props) => {
  const { data, buttons } = props;

  return (

    <Stack direction='column' gap={4} margin={'8% 5%'} className="pinButtons">
    {Object.keys(buttons).map((key, index) => {
        return (
          <Link key={index} to={data[`homeButton${index + 1}_link`]}> {/* Link each img and text to the button */}
            <Stack direction='row' className='item' key={index} margin={'0% 5%'}>
                <div className="item-left">
                  <img src={buttons[key]} alt={`button_${index + 1}`} />
                </div>
                <div className="item-right">
                  <p>{data[`homeButton${index + 1}_text`]}</p>
                </div>
            </Stack>
            </Link>
        );
    })}
</Stack>
    // <Stack direction="row" className="pinButtons" >
    //   {buttons.map((button, index) => ( //for each button
    //     <Link key={index} to={data[`homeButton${index + 1}_link`]}> {/* Link each img and text to the button */}
    //       <Stack direction="row" className="item" margin="16% 10%" >
    //         <div className="item-left">
    //         <img src={button} alt={`button_${index + 1}`} />
    //         </div>
    //         <div className="itemr-ight">
    //         <p>{data[`homeButton${index + 1}_text`]}</p>
    //           </div>
    //       </Stack>
    //     </Link>
    //   ))}
    // </Stack>
  );
};