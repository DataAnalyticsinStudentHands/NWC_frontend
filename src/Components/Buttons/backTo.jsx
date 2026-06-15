import "./backTo.css";
import { useNavigate } from "react-router-dom";

function BackToButton(props) {
  let name = props.name;
  let link = props.link;
  let navigate = useNavigate();

  return name.toLowerCase() === "previous" ? (
    <p className="back" onClick={() => navigate(-1)}>
      <span className="larr">&larr;</span> <span>BACK TO PREVIOUS PAGE</span>
    </p>
  ) : (
    <p className="back" onClick={() => navigate(link)}>
      <span className="larr">&larr;</span>
      <span>BACK TO {name} PAGE</span>
    </p>
  );
}
export default BackToButton;
