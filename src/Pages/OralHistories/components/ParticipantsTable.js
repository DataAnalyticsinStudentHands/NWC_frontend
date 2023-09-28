import React, { useState } from 'react';
import leftIcon from '../../ResearchingNWC/res/Left Button.svg'
import rightIcon from '../../ResearchingNWC/res/Right Button.svg'
import '../../Discover/Discover.css'
import Select from 'react-select';
import stateTerritories from '../../../assets/stateTerritories.json';
import { Pagination } from '../../ResearchingNWC/Components/Pagination'

export const ParticipantsTable = (props) => {
// Duplicate the existing entries to fill the table
const numberOfEntriesToDuplicate = 6; // Change this to the number of duplicates you want

const duplicatedParticipants = [];

for (let i = 0; i < numberOfEntriesToDuplicate; i++) {
  duplicatedParticipants.push(...props.participants);
}
  //States for pagination settings
  const [currentPage, setCurrentPage] = useState(0);
  const [optionsCurrentPage, setOptionsCurrentPage] = useState(0);
  const participantsPerPage = 8;
  const optionsPerPage = 5;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const options = [
    "Delegates & Alternates", "Delegates at Large", "National Commissioners",
    "Observers", "Journalists", "Notable Speakers", "Paid Staff Members", "Volunteers",
    "Exhibitors", "Torch Relay Runners", "International Dignitaries"
  ];
  //State for option selection
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionsNext = () => {
    if (endIndex < options.length) {
      setOptionsCurrentPage(optionsCurrentPage + 1);
    }
  };
  
  const handleOptionsPrevious = () => {
    if (optionsCurrentPage > 0) {
      setOptionsCurrentPage(optionsCurrentPage - 1);
    }
  };

  const stateOptions = [] // Store states
  Object.values(stateTerritories).forEach((state) => {
      stateOptions.push({value: state.stateCode, label: state.state}) 
  })

  const [searchTerm, setSearchTerm] = useState(''); //State to store user input
  const [selectedStates, setSelectedStates] = useState([]); // State to store selected states

  // Filter participants based on the search term and selected states
  const filteredParticipants = duplicatedParticipants.filter(item => {
    console.log('item: ', item[4])
    const nameMatches = item[1] && item[1].toLowerCase().includes(searchTerm.toLowerCase());
    // Filter if no states selected or at least one selected state matches
    const stateMatches = selectedStates.length === 0 || selectedStates.some(selectedState => selectedState.label === item[4]);

    return nameMatches && stateMatches;
  });
  //For Table 1: Headers
  const startIndex = optionsCurrentPage * optionsPerPage;
  const endIndex = startIndex + optionsPerPage;

  // Adjust participants rendering for Table 2: Participants
  const startParticipantIndex = currentPage * participantsPerPage;
  const endParticipantIndex = startParticipantIndex + participantsPerPage;
  const displayedParticipants = filteredParticipants.slice(
    startParticipantIndex,
    endParticipantIndex
  );

  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions);
  };

  return (
      <div>
        <table className="options-table">
          <thead>
            <tr>
              <th>
                <button
                  className="previous-button"
                  onClick={handleOptionsPrevious}
                  disabled={optionsCurrentPage === 0}
                >
                  <img src={leftIcon} alt="Previous" />
                </button>
              </th>
              {options
                .slice(
                  optionsCurrentPage * optionsPerPage,
                  (optionsCurrentPage + 1) * optionsPerPage
                )
                .map((option, index) => (
                  <th key={index} className={`header-cell ${selectedOption === option ? 'bold' : ''}`}>
                                    <button
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
                  </th>
                ))}
              <th>
                <button
                  className="next-button"
                  onClick={handleOptionsNext}
                  disabled={endIndex >= options.length}
                >
                  <img src={rightIcon} alt="Next" />
                </button>
              </th>
            </tr>
          </thead>
        </table>
         
      {/* Table 2: Participants */}
        <table className="participants-table">
            <tbody>
              {/* Add a new row for the search input */}
              <tr style={{ height: '8em' }}>
                <td colSpan="2">
                  <div className="discoverSearch_bar" >
                    <input placeholder="Search Participants by Name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </td>
                <td colSpan="2">
                <Select
                isMulti
                options={stateOptions}
                value={selectedStates} // Set the selected states
                onChange={handleStateChange} // Handle state selection change
                placeholder="State/Territory" // Your custom placeholder text here
                className="select"
                classNamePrefix="select"
              />  
                </td>
              </tr>
              {filteredParticipants.length === 0 ? ( // Check if there are no results
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No results found
                  </td>
                </tr>
                ) : (
                  Array.from({ length: Math.ceil(displayedParticipants.length / 4) }, (v, row) => (
                    <tr key={row}>
                      {displayedParticipants.slice(row * 4, (row + 1) * 4).map((item, index) => (
                        item[3] && (
                          <td key={index}>
                              <a href={item[2]} target="_blank" rel="noopener noreferrer">
                                  <div className="image-container">
                                      <img src={item[3]} alt="Participant" />
                                  </div>
                              </a>
                              {item[1] && <div>{item[1]}</div>}
                          </td>
                        )
                      ))}
                    </tr>
                ))
              )}
            </tbody>
        </table>
        <Pagination pageCount={Math.ceil(filteredParticipants.length / participantsPerPage)} handlePageClick={handlePageChange}/>
    </div>
  );
};