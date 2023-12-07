import './PinButtons.scss';
import { Link } from 'react-router-dom';
import { Stack } from '../../Components/Stack';

export const PinButtons = (props) => {
  const { data, buttons } = props;

  return (
    <Stack direction="row" className="homeButtons" margin="6% 6%" spacing={20} wrap>
      {buttons.map((button, index) => ( //for each button
        <Link key={index} to={data[`homeButton${index + 1}_link`]}> {/* Link each img and text to the button */}
          <Stack direction="row" className="homeButtons_button">
            <img src={button} alt={`button_${index + 1}`} />
            <p>{data[`homeButton${index + 1}_text`]}</p>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};