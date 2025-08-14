import cassetteImage from "../res/Cassette.png"; // your cassette PNG
import SS77 from "../res/SS-77.png"
import './Cassette.scss'

export default function CassetteCard({ name, role, description }) {
  return (
    <div className="cassette-card">
      <div className="cassette-image">
        <img src={cassetteImage} alt="cassette" />
        <div className="cassette-overlay">
          <div className="cassette-text">
            <div className="cassette-name">{name}</div>
            <div className="cassette-role">{role}</div>
          </div>
          <div className="cassette-code"><img src={SS77} alt="SS77"/></div>
          <div className="cassette-description">{description}</div>
        </div>
      </div>
    </div>
  );
}