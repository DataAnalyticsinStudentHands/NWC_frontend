import './Card.scss';

export default function Card({ name, description, blob: Blob, blobColor, icon, borderImage }) {
  return (
    <div className="card-wrapper">
      {borderImage && <img src={borderImage} alt="Card border" className="card-border" />}
      <div className="card">
        <div className="card-content">
          <div className="card-header">
            <div className="card-name">{name}</div>
            <div className="card-code" style={{ color: blobColor }} >SS-77</div>
          </div>
          
          {/* Profile Blob + Icon */}
          <div className="card-profile">
            <Blob
                className="card-blob"
                style={{ color: blobColor }}
            />
            {icon && <img src={icon} alt="Card icon" className="card-icon" />}
          </div>

          <div className="card-description">{description}</div>
        </div>
      </div>
    </div>
  );
}
