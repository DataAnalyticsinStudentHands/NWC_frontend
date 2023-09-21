import React, { useState } from 'react';
import leftIcon from '../../ResearchingNWC/res/Left Button.svg'
import rightIcon from '../../ResearchingNWC/res/Right Button.svg'

export const ParticipantsTable = (props) => {
// Duplicate the existing entries to fill the table
const numberOfEntriesToDuplicate = 4; // Change this to the number of duplicates you want

const duplicatedParticipants = [];

for (let i = 0; i < numberOfEntriesToDuplicate; i++) {
  duplicatedParticipants.push(...props.participants);
}

  const optionsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const options = [
    "Delegates & Alternates", "Delegates at Large", "National Commissioners",
    "Observers", "Journalists", "Notable Speakers", "Paid Staff Members", "Volunteers",
    "Exhibitors", "Torch Relay Runners", "International Dignitaries"
  ];

  const startIdx = currentPage * optionsPerPage;
  const endIdx = startIdx + optionsPerPage;
  const displayedOptions = options.slice(startIdx, endIdx);

  const handleNext = () => {
    if (endIdx < options.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
        <table className="options-table">  {/* Table 1: Headers */}
            <thead>
                <tr>
                <th>
                    <button className="previous-button" onClick={handlePrevious} disabled={currentPage === 0}>
                    <img src={leftIcon} alt="Previous" />
                    </button>
                </th>
                {displayedOptions.map((option, index) => (
                    <th key={index} className="header-cell">
                    {option}
                    </th>
                ))}
                <th>
                    <button className="next-button" onClick={handleNext} disabled={endIdx >= options.length}>
                    <img src={rightIcon} alt="Previous" />
                    </button>
                </th>
                </tr>
            </thead>
        </table>

      {/* Table 2: Participants */}
        <table className="participants-table">
            <tbody>
                {Array.from({ length: Math.ceil(duplicatedParticipants.length / 4) }, (v, row) => (
                <tr key={row}>
                    {duplicatedParticipants.slice(row * 4, (row + 1) * 4).map((item, index) => (
                    item[3] && (
                        <td key={index}>
                        <a href={item[2]} target="_blank" rel="noopener noreferrer">
                            <img
                            src={item[3]} 
                            alt="Participant"
                            />
                        </a>
                        {item[1] && <div>{item[1]}</div>} {/* Display the name below the image */}
                        </td>
                    )
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};