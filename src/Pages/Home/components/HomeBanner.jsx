import toform from '../res/toform.png';
import '../components/HomeBanner.css'

export const HomeBanner = () => {
    return (
      <div className="homeBanner">
        <div className="homeBanner_toForm">
          <img src={toform} alt="conference_logo" />
        </div>
        <div className="homeBanner_card">
          <h3>Sharing Stories from 1977</h3>
          <div className="homeBanner_cardHr"></div>
          <p>PUTTING THE NATIONAL WOMEN&apos;S CONFERENCE ON THE MAP</p>
        </div>
      </div>
    );
  };