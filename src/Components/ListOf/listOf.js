import React, { useEffect, useState, useRef } from 'react'
import './listOf.css';
import { CSVLink } from "react-csv";
import Select from 'react-select';
import stateTerritories from '../../assets/stateTerritories.json';

var currentData = 'default'

function ListOf(props){
    let dataType = props.dataType
    const [listData, setListData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [stateChoices, setStateChoices] = useState([]);
    const [activeLetter, setActiveLetter] = useState(null);
    const [currentOffSet, setCurrentOffSet] = useState(0);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState(false)
    const [searchBar, setSearchBar] = useState(false)
    const listOfData = useRef([])

    useEffect(() => {
        if(dataType === 'Participants'){
            fetch([process.env.REACT_APP_API_URL, 'api/list-of-participants?sort[0]=LastName'].join('/')) // need to figure out how to sort in query, but for another day </3
                    .then(res => res.json())
                    .then(data => {
                        listOfData.current = data.data
                        setListData(data.data)
                        setFilter(true)
                    })
                    .catch(err => console.log(err));
        } 

        if(dataType === 'Organizations'){
            if(currentData === 'search'){
                fetch([process.env.REACT_APP_API_URL, `api/organizational-and-politicals?filters[organizational_and_political][$containsi]=${input}&sort[0]=organizational_and_political:asc`].join('/'))
                .then(response => response.json())
                .then(data => {
                    listOfData.current = data.data
                    setListData(data.data)
                    setSearchBar(true)
                })
                .catch(err => console.log(err));
            }else{
                fetch([process.env.REACT_APP_API_URL, 'api/organizational-and-politicals?sort[0]=organizational_and_political:asc'].join('/')) // need to figure out how to sort in query, but for another day </3
                    .then(res => res.json())
                    .then(data => {
                        console.log('49')
                        listOfData.current = data.data
                        setListData(data.data)
                        setSearchBar(true)
                    })
                    .catch(err => console.log(err));
            }
        }
        
    }, [currentOffSet]); // eslint-disable-line

    function setOffset(){
        if(currentOffSet === 0){
            setCurrentOffSet(1)
          }else{
            setCurrentOffSet(0)
          }    
    }

    function search(){
        currentData = 'search'
        setOffset()
      }



    const handleChange = e => {
        let selectedValues = e.map(e=>{return e.label})
        setSelectedValue(selectedValues);
        const list = listOfData.current.filter(fullList => selectedValues.includes(fullList.attributes.States)).map(p=>{
            return p
        })
        setStateChoices(list)
        selectedValues.length === 0?setListData(listOfData.current): setListData(list)
    }

    // adding USA list of states for select input
    const stateOptions = []
    Object.values(stateTerritories).forEach((state) => {
        stateOptions.push({value: state.stateCode, label: state.state}) 
    })

    function handleLetterChange(letter){
        setActiveLetter(letter)
        if(letter === 'reset'){
            setListData(listOfData.current)
            return
        }
        if(dataType === 'Participants'){
            const letterList = stateChoices.length === 0
            ?listOfData.current.filter(stateList => letter.includes(stateList.attributes.LastName[0].toLowerCase()))
            :stateChoices.filter(stateList => letter.includes(stateList.attributes.LastName[0].toLowerCase()))
            setListData(letterList)
        }
        if(dataType === 'Organizations'){
            const letterList = letter === null
            ? listOfData.current
            :listOfData.current.filter(orgList => letter.includes(orgList.attributes.organizational_and_political[0].toLowerCase()))
            setListData(letterList)
        
        }

        
    }

    return(
        <div className="listOf">
            {/**BACK LINK */}
            {/* <p className='backToDiscover'>
                <BackToButton name='Discover' link='/discover'/>
            </p> */}
            
            <h1>List of NWC {dataType}</h1>
            <div className='listOfOptions'>
            {
                searchBar
                ?<div className="organizationSearch">
                    <div className="organizationSearch_bar">
                        <input placeholder="Search Organization by Name" value={input} onChange={e => setInput(e.target.value)} />
                        <button className="organizationSearch_icon" onClick={() => search()}></button>
                    </div>
                </div>
                :''
            }
            {/**FILTER */}
            {/* <div className="listOfFilter"> */}
            {
                filter
                ?<div className='listOfFilter'>
                    <p>Filter by State: </p>
                    <Select id='select'
                        isMulti
                        options={stateOptions}
                        onChange={handleChange}
                        // onChange={onSelect}
                        // value={selectedOptions}
                        value={stateOptions.find(obj => obj.value === selectedValue)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    >
                    </Select>
                </div>
                
                :''

            }
               
                
                <CSVLink 

                    data={
                            dataType === 'Participants'
                            ?[["Last Name", "First Name", "State"],...listData.map(p => [p.attributes.LastName, p.attributes.FirstName, p.attributes.States]),]
                            :[["Organization"],...listData.map(p => [p.attributes.organizational_and_political]),]
                        }
                    filename={
                            dataType === 'Participants'
                            ?`listOfParticipants-${Date.now()}.csv`
                            :`listOfOrganizations-${Date.now()}.csv`
                        }
                >
                    Download CSV
                </CSVLink>
                {/* </div> */}
            </div>
            
            <div className='alphabetList'>
                <p className={activeLetter === 'a'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('a')}>A</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'b'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('b')}>B</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'c'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('c')}>C</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'd'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('d')}>D</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'e'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('e')}>E</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'f'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('f')}>F</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'g'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('g')}>G</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'h'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('h')}>H</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'i'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('i')}>I</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'j'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('j')}>J</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'k'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('k')}>K</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'l'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('l')}>L</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'm'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('m')}>M</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'n'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('n')}>N</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'o'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('o')}>O</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'p'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('p')}>P</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'q'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('q')}>Q</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'r'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('r')}>R</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 's'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('s')}>S</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 't'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('t')}>T</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'u'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('u')}>U</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'v'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('v')}>V</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'w'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('w')}>W</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'x'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('x')}>X</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'y'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('y')}>Y</p>
                <p className='letterSeperator'>-</p>
                <p className={activeLetter === 'z'?'activeLetter':'letterSort'} onClick={() => handleLetterChange('z')}>Z</p>
                <p className='resetLetterSort' onClick={() => handleLetterChange('reset')}>Reset</p>
            </div>

            {/**LIST */}
            <div className="listOfList">
                
                <ul className='listOfContainer'>
                    {
                        listData.length === 0
                            ? "No data found."
                            : dataType === 'Participants'
                            ? listData.map(participant => <ul key={Math.random()}>{participant.attributes.LastName}, {participant.attributes.FirstName}, {participant.attributes.States}</ul>)
                            : listData.map(organization => <ul key={Math.random()}>{organization.attributes.organizational_and_political}</ul>)
                    }
                </ul>
            
            </div>
        </div>
    )
}

export default ListOf;