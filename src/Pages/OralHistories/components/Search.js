import React, { useState } from 'react';

export const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    props.onSearch(e.target.value);
  };

  return (
    <input
      placeholder={props.placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}

export default Search;