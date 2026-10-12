import { useState } from "react";

function Collapsible(props) {
  const [isOpen, setIsOpen] = useState(false);

  // Use the provided className prop if available, otherwise use the default value
  const containerClassName = props.className ? props.className : "Collapsible";
  const contentClassName = props.contentClassName ? props.contentClassName : "content";

  return (
    <div className={`${containerClassName} ${isOpen ? "active" : ""}`}>
      <button
        type="button"
        className="toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.label}
      </button>
      {isOpen && <div className={contentClassName}>{props.children}</div>}
    </div>
  );
}

export default Collapsible;
