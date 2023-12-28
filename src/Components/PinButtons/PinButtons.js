import './PinButtons.scss';
import { Link } from 'react-router-dom';
import { Stack } from '../../Components/Stack';

export const PinButtons = ( { button, link, text}) => {
  return (
    <Link to={link}>
      <Stack className="item_pin">
        <img src={button} alt="button" className="item-left_pin"/>
        <p className="item-right_pin"> {text} </p>
      </Stack>
    </Link>
  );
};
