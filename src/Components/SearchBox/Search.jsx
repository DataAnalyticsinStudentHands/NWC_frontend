import "./Search.css";

export const Search = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      value={props.value} // Pass the value from the parent component
      onChange={(e) => props.onSearch(e.target.value)}
      style={props.style}
    />
  );
};