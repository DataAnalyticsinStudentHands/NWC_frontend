import './PinButtons.css';
import { Link } from 'react-router-dom';
import { Stack } from '../../Components/Stack';

export const PinButtons = ( { button, link, text}) => {
  return (
    <Link to={link}>
      <div className="item_pin">
        <img src={button} alt="button" className="item-left_pin"/>
        <p className="item-right_pin"> {text} </p>
      </div>
    </Link>
  );
};
