import './AdvancedSearch.css'
import Tabs from "./Tabs";
import Map from "./Map"
import { useState } from "react";

export default function Results(props) {
    //Used for setting up pagination
    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the indexes of the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the subset of items based on the current page
    const displayedData = props.map_data.slice(startIndex, endIndex);

    // Update the current page number
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    return (
        <Tabs>
            <div label="Chart View">
            <table className="advancedTable">
            <thead>
            <tr style={{ background: '#cadfee' }}>
                <th>last name</th>
                <th>first name</th>
                <th>state/territory</th>
                <th>role</th>
                <th>race/ethnicity</th>
                <th>religion</th>
                <th>education</th>
                <th>political offices held</th>
                <th>political party membership</th>
            </tr>
            </thead>
            <tbody>
            {displayedData.map((val) => (
                <tr key={val.id}>
                <td>{val.attributes.last_name}</td>
                <td>{val.attributes.first_name}</td>
                <td>{val.attributes.residence_in_1977.data?.attributes.residence_in_1977}</td>
                <td>{val.attributes.role.data.map((e, index) => {
                    if (index === 0) {return '• ' + e.attributes.role; } else {return [<br key={index} />, '• ' + e.attributes.role];}
                    })}
                </td>
                <td>
                    {val.attributes.races.data.map((e, index) => {
                    if (index === 0) { return '• ' + e.attributes.race;} else {return [<br key={index} />, '• ' + e.attributes.race];}
                    })}
                </td>
                <td>{val.attributes.religion}</td>
                <td>{val.attributes.highest_level_of_education_attained}</td>
                <td>
                    {val.attributes.political_office_helds.data.map((e, index) => {if (index === 0) {return '• ' + e.attributes.political_office;} else {return [<br key={index} />, '• ' + e.attributes.political_office];
                    }})}
                </td>
                <td>{val.attributes.political_party_membership}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="advancedSearch">
            <div className="pagination" style={{left: "0px", marginLeft: "0px", right: "0px", marginTop: "5px"}}>
            {Array.from({ length: Math.ceil(props.map_data.length / itemsPerPage) }, (_, index) => (
                <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => {
                    handlePageChange(index + 1);
                    const tableElement = document.querySelector('.advancedSearch1');
                    if (tableElement) {
                    setTimeout(() => {
                        tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100); // Adjust the delay as needed
                    }
                }} >
                {index + 1}
                </button>
            ))}
            </div>
        </div>
        </div>
        <div label="Map View">
            <Map map_data={props.map_data}/>
        </div>
      </Tabs>
    );
}