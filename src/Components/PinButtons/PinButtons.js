import './PinButtons.scss';
import { Link } from 'react-router-dom';
import { Stack } from '../../Components/Stack';

export const PinButtons = (props) => {
  const { data, buttons } = props;

  return (
    <Stack direction='row' spacing={4} margin={'8% 5%'} className="pinButtons" wrap={true}>
      {Object.keys(buttons).map((key, index) => (
        <Link key={index} to={data[`homeButton${index + 1}_link`]}>
          <Stack direction='row' className='item_pin' key={index}>
            <div className="item-left_pin">
              <img src={buttons[key]} alt={`button_${index + 1}`} />
            </div>
            <div className="item-right_pin">
              <p>{data[`homeButton${index + 1}_text`]}</p>
            </div>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};
