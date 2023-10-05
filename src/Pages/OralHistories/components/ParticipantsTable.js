import React, { useState } from 'react';
import leftIcon from '../../ResearchingNWC/res/Left Button.svg'
import rightIcon from '../../ResearchingNWC/res/Right Button.svg'
import '../../Discover/Discover.css'
import stateTerritories from '../../../assets/stateTerritories.json';
import { Pagination } from '../../ResearchingNWC/Components/Pagination'
import { Stack } from "../../../Components/Stack";
import StateSelect from '../../../Components/StateSelect/StateSelect'

export const ParticipantsTable = (props) => {
// Duplicate the existing entries to fill the table
const numberOfEntriesToDuplicate = 5; // Change this to the number of duplicates you want

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

  //State for option selection
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionsNext = () => {
    if (endIndex < props.sortoptions.length) {
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

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
      <div>
        <Stack spacing={6}>  {/* Options */}
          <button
            className="previous-button"
            onClick={handleOptionsPrevious}
            disabled={optionsCurrentPage === 0}
          >
            <img src={leftIcon} alt="Previous" />
          </button>
          {props.sortoptions
            .slice(
              optionsCurrentPage * optionsPerPage,
              (optionsCurrentPage + 1) * optionsPerPage
            )
            .map((option, index) => (
              <span //Creates options to sort the participants
                key={index}
                className={`header-cell ${selectedOption === option ? 'bold' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="hoverable-text">{option}</span>
              </span>
            ))}
          <button
            className="next-button"
            onClick={handleOptionsNext}
            disabled={endIndex >= props.sortoptions.length}
          >
            <img src={rightIcon} alt="Next" />
          </button>
        </Stack>
         
        {/* Participants */}
        <div className="participants-table">
          <div className="search-row">
            <div className="search-cell align-center">
              <div className="discoverSearch_bar">
                <input
                  placeholder="Search Participants by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="search-cell align-center"> {/* State select */}
              <StateSelect onSelect={handleStateChange} selectedOptions={selectedStates}/>
            </div>
          </div>
          <Stack justifyContent="center" spacing={2} wrap> {/* Displays list of participants */}
            {filteredParticipants.length === 0 ? (
              <div className="no-results">No results found</div>
            ) : (
              displayedParticipants.map((item, index) => (
                item[3] ? (
                  <div key={index} className="participant-cell">
                    <a href={item[2]} target="_blank" rel="noopener noreferrer">
                      <div className="image-container">
                        <img
                          src={item[3]}
                          alt="Participant"
                          className="participant_pic"
                        />
                      </div>
                    </a>
                    {item[1] && <div>{item[1]}</div>}
                  </div>
                ) : null
              ))
            )}
        </Stack>
      </div>
        <Pagination pageCount={Math.ceil(filteredParticipants.length / participantsPerPage)} handlePageClick={handlePageChange}/>
    </div>
  );
};