import React, {useState, useRef, useEffect} from 'react'
import VARIABLES from '../../config/.env';
import './Organizations.css'
import BackToButton from '../../Components/Buttons/backTo';
import ListOf from '../../Components/ListOf/listOf';
var currentData = 'default'

function Organizations() {
    const { fetchBaseUrl } = VARIABLES;

    const [organizations, setOrganizations] = useState([]);
    const [currentOffSet, setCurrentOffSet] = useState(0);
    const [input, setInput] = useState("");
    const listOfOrganizations = useRef([])
    // Pull Strapi Data
    useEffect(() => {

        if(currentData === 'default'){
            fetch([VARIABLES.fetchBaseUrl, 'api/organizational-and-politicals?sort[0]=organizational_and_political:asc'].join('/')) // need to figure out how to sort in query, but for another day </3
            .then(res => res.json())
            .then(data => {
                
                listOfOrganizations.current = data.data
                setOrganizations(data.data)
            })
            .catch(err => console.log(err));
        }
        if(currentData === 'search'){
            if(input){
                fetch([fetchBaseUrl, `api/organizational-and-politicals?filters[organizational_and_political][$containsi]=${input}&sort[0]=organizational_and_political:asc`].join('/'))
                .then(response => response.json())
                .then(data => {
                    
                    listOfOrganizations.current = data.data
                    setOrganizations(data.data)
                })
                .catch(err => console.log(err));
              }else{
                fetch([fetchBaseUrl, `api/organizational-and-politicals?sort[0]=organizational_and_political:asc`].join('/'))
                .then(response => response.json())
                .then(data => {
                    
                    listOfOrganizations.current = data.data
                    setOrganizations(data.data)
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
        
        setOffset()
      }

    return (
        <div className="organizations">
            {/*BACK LINK */}
            { <p className='backToDiscover'>
                <BackToButton name='Researching The NWC' link='/ResearchingNWC'/>
            </p> }
            
            {/* <h1>List of NWC organizations</h1>
            
            <div className="organizationSearch">
                <div className="organizationSearch_bar">
                    <input placeholder="Search Organization by Name" value={input} onChange={e => setInput(e.target.value)} />
                    <button className="organizationSearch_icon" onClick={() => search()}></button>
                </div>
            </div>
            <div className='organizationOptions'>
            
            </div>

           
            <div className="organizationsList">
                
                <ul className='organizationContainer'>
                    {
                        organizations.length === 0
                            ? "No organizations Found."
                            : organizations.map(organization => <ul key={Math.random()}>{organization.attributes.organizational_and_political}</ul>)
                    }
                </ul>
            
            </div> */}
            <ListOf dataType='Organizations'/>
        </div>
    )
}

export default Organizations
