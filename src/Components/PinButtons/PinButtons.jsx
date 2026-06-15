import './PinButtons.css';
import { Link } from 'react-router-dom';

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
