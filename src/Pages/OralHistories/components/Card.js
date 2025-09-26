import './Card.scss';
import placeholder from '../res/placeholder.png'

export default function Card({ name, description, borderColor, profilepic }) {
  return (
    <div className="card" style={{ borderColor }}>
      <div className="card-content">
        <div className="card-header">
          <div className="card-name">{name}</div>
          <div className="card-code">SS-77</div> 
        </div>
        <div className="card-profilepic">
          {profilepic ? (
            <img src={profilepic} alt={`${name}'s profile`} />
          ) : (
            <img src={placeholder} alt="Placeholder" />
          )}
      </div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
}
