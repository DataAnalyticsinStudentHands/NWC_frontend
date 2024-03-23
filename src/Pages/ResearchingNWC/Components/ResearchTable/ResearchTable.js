import "./ResearchTable.css";
export const ResearchTable = (props) => {
  const sortedData = [...props.data].sort((a, b) => {
    if (props.sortOrder === "asc") {
      if (a[props.sortKey] === null) return 1;
      if (b[props.sortKey] === null) return -1;
      return a[props.sortKey] > b[props.sortKey] ? 1 : -1;
    } else {
      if (a[props.sortKey] === null) return -1;
      if (b[props.sortKey] === null) return 1;
      return a[props.sortKey] < b[props.sortKey] ? 1 : -1;
    }
  });

  const data = props.data.map((val) => {
    Object.entries(val).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        val[key] = value
          .map((v) => (v !== null && !Number.isInteger(v) ? v : "")) // If v is null, replace it with an empty string
          .filter(
            (v) =>
              !v.toLowerCase().startsWith("nominated") &&
              !v.toLowerCase().startsWith("votes")
          )
          .join("; \n");
      } else {
        val[key] = value;
      }
    });
    return val;
  });
  return (
    <div className="result-table">
      <table>
        <thead>
          <tr>
            {Object.keys(sortedData[0]).map((val) => {
              return (
                <th key={val} onClick={() => props.handleSort(val)}>
                  {val}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((val, index) => {
            return (
              <tr key={index}>
                {Object.values(val).map((e, index) => {
                  return <td key={index}>{e}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
