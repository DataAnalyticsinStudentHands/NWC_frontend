import React, { useState } from 'react';
import leftIcon from '../../ResearchingNWC/res/Left Button.svg'
import rightIcon from '../../ResearchingNWC/res/Right Button.svg'
import '../../Discover/Discover.css'
import stateTerritories from '../../../assets/stateTerritories.json';
import { Pagination } from '../../ResearchingNWC/Components/Pagination'
import { Stack } from "../../../Components/Stack";
import { Search } from "./Search"
import { Typography } from "../../../Components/Typography"
import StateSelect from '../../../Components/StateSelect/StateSelect'

export const ParticipantsTable = (props) => {
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
    if (endIndex < props.roles.length) {
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

  const [searchButtonClicked, setSearchButtonClicked] = useState(false); //state for search button
  const [filterValue, setFilterValue] = useState(''); // Store the filter value separately
  const handleSearch = () => {
    setSearchButtonClicked(true);
    setFilterValue(searchTerm); // Update the filter value when the button is clicked
  };
  
  const handleReset = () => { //handler for reset button
    setFilterValue('');
    setSearchTerm(''); // Clear the search input
    setSelectedStates([]); // Clear selected states
    setSelectedOption(null); // Clear selected option
    setSearchButtonClicked(false);
    };

  function removePunctuation(text) { //Removes punctuation and splits the string into separate words
    if (!text) return [];
    const newText = text.replace(/[.,#!$%&;:{}=\-_`~()]/g, '');
    return newText.split(/\s+/);
  }

  //filters participants based on criteria
  const filteredParticipants = props.participants.filter((item) => {
    const nameMatches = (!searchButtonClicked || filterValue === '' || (filterValue && item[1]?.toLowerCase().includes(filterValue.toLowerCase())));
    const stateMatches = selectedStates.length === 0 || selectedStates.some(selectedState => selectedState.label === item[4]);
  
    const splitSelectedOption = removePunctuation(selectedOption);
    const splitRole = removePunctuation(item[6]);
  
    const roleMatches = !selectedOption || splitSelectedOption.filter(word => splitRole.includes(word)).length >= 2;
  
    return nameMatches && stateMatches && roleMatches;
  });


  //For Role Selection
  const startIndex = optionsCurrentPage * optionsPerPage;
  const endIndex = startIndex + optionsPerPage;

  // Adjust participants rendering for Table 2: Participants
  const startParticipantIndex = currentPage * participantsPerPage;
  const endParticipantIndex = startParticipantIndex + participantsPerPage;
  const displayedParticipants = filteredParticipants.slice(
    startParticipantIndex,
    endParticipantIndex
  );
    //handler for states
  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions);
  };

  //handler for the role options
  const handleOptionClick = (option) => {
    // If the selected option is the same as the current selectedOption, clear the sort and remove the "bold" class
    if (selectedOption === option) {
      setSelectedOption(null); // Clear the selected option
      // Optionally, you can reset the sort order here if needed
    } else {
      setSelectedOption(option); // Set the selected option
      // Optionally, you can set the sort order here if needed
    }
  };
  
  return (
      <>
        <Stack spacing={6}>  {/* Options */}
          <button
            className="previous-button"
            onClick={handleOptionsPrevious}
            disabled={optionsCurrentPage === 0}
          >
            <img src={leftIcon} alt="Previous" />
          </button>
          {props.roles
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
                <Typography type="paragraph-2" paddingLR="0" paddingTB="0"><span className="hoverable-text">{option}</span> </Typography>
              </span>
            ))}
          <button
            className="next-button"
            onClick={handleOptionsNext}
            disabled={endIndex >= props.roles.length}
          >
            <img src={rightIcon} alt="Next" />
          </button>
        </Stack>
         
        {/* Participants */}
        <div className="participants-table">
          <div className="search-row">
          <div className="search-cell align-center"> {/* State select */}
              <StateSelect onSelect={handleStateChange} selectedOptions={selectedStates}/>
            </div>
            <div className="search-cell align-center">
              <div className="discoverSearch_bar">
                <Search placeholder="Search Participants by Name" onSearch={setSearchTerm}/>
              <button type="button" className="button_reset" onClick={handleReset}>Reset</button>
              <button type="button" className="button_search" onClick={handleSearch}>SEARCH</button>
              </div>
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
                    {item[1] && <Typography type="body-text"> {item[1]} </Typography>}
                  </div>
                ) : null
              ))
            )}
        </Stack>
      </div>
        <div className="participants-pagination"> <Pagination pageCount={Math.ceil(filteredParticipants.length / participantsPerPage)} handlePageClick={handlePageChange}/> </div>
    </>
  );
};