import React, { useState, useEffect } from 'react';
import "./Search.css";
import qs from 'qs';

export const AutoFillSearch = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    
    // Handle user input changes
    const handleInputChange = (event) => {
      const input = event.target.value;
      setSearchTerm(input);
    //   fetchSuggestions(input);
      setSelectedSuggestion(-1); // Reset selected suggestion when the input changes
    };
    
    // Handle keyboard events (e.g., Tab key for selection)
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default Tab behavior (e.g., moving focus)
    
        if (selectedSuggestion !== -1) {
          setSearchTerm(
            suggestions[selectedSuggestion]
            ); // Use the selected suggestion
           setSuggestions([])
        }
      } else if (event.key === 'ArrowUp' && selectedSuggestion > 0) {
        event.preventDefault();
        setSelectedSuggestion(selectedSuggestion - 1); // Move selection up
    
      } else if (event.key === 'ArrowDown' && selectedSuggestion < suggestions.length - 1) {
        event.preventDefault();
        setSelectedSuggestion(selectedSuggestion + 1); // Move selection down
      }
    
    };
    
    
    // ... (fetchSuggestions function and debouncing, if needed)
    
    useEffect(() => {
    
        let el = document.getElementById('autoSearch-input')
        el.value.length === 0 ? el.style.setProperty('width', '200px') :
        el.style.setProperty('width', el.value.length * 10 + 8 + 'px')
    
        console.log(searchTerm);
    
    
        async function fetchSuggestions(input) {
            const query = qs.stringify({
                fields:['last_name', 'first_name'],
                filters:{
                    first_name:{
                        $startsWithi:input
                    }
                },
                sort:['last_name', 'first_name']
            },{encodeValuesOnly:true});
    
            fetch(`${process.env.REACT_APP_API_URL}/api/nwc-participants?${query}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data.data);
                let dataRes = data.data.map((item) => {
                    return item.attributes.first_name + ' ' + item.attributes.last_name
                })
                setSuggestions(dataRes);
            })
    
    
            // setSuggestions(data.data);
        }
        // if(
        // 	searchTerm.length === 0
        // ){
        // 	setFillText("")
        // 	setSuggestions([])
        // } else{
        // 	if(searchTerm.split(', ').length > 1){
        // 		let last_name = searchTerm.split(', ')[0]
        // 		let first_name = searchTerm.split(', ')[1]
                
        // 		console.log('searchTerm '+ searchTerm + ' last name: ' + last_name + ' first name: ' + first_name);
    
        // 		fetchSuggestions({first_name:first_name, last_name:last_name})
    
        // 	} else if(searchTerm.split(' ').length > 1){
        // 		let first_name = searchTerm.split(' ')[0]
        // 		let last_name = searchTerm.split(' ')[1]
        // 		console.log('searchTerm '+ searchTerm + ' last name: ' + last_name + ' first name: ' + first_name);
    
        // 	} else{
    
        // 	}
        // }
        searchTerm.length > 0 && fetchSuggestions(searchTerm);
    
    }, [searchTerm]);
    
    return (
      <div className='autoSearch'>
        <div className='autoSearch-inputContainer'>
            <input
            id='autoSearch-input'
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            />
            <span>
                {
                    suggestions[selectedSuggestion]?.slice(searchTerm.length)
                }
            </span>	
        </div>
    
    
        {/* Display auto-fill suggestions */}
        <ul className="suggestions">
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              className={index === selectedSuggestion ? 'selected' : ''}
              onClick={() => setSearchTerm(
                suggestion
                )} // Handle click to select suggestion
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    );
    };