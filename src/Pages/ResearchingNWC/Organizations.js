import React, {useState, useRef, useEffect} from 'react'
import './Organizations.css'
import BackToButton from '../../Components/Buttons/backTo';
import ListOf from '../../Components/ListOf/listOf';
var currentData = 'default'

function Organizations() {
    // const [organizations, setOrganizations] = useState([]);
    // const [currentOffSet, setCurrentOffSet] = useState(0);
    // const [input, setInput] = useState("");
    // const listOfOrganizations = useRef([])
    // // Pull Strapi Data

    // function setOffset(){
    //     if(currentOffSet === 0){
    //         setCurrentOffSet(1)
    //       }else{
    //         setCurrentOffSet(0)
    //       }    
    // }

    // useEffect(() => {

    //     if(currentData === 'default'){
    //         fetch([process.env.REACT_APP_API_URL, 'api/organizational-and-politicals?sort[0]=organizational_and_political:asc'].join('/')) // need to figure out how to sort in query, but for another day </3
    //         .then(res => res.json())
    //         .then(data => {
                
    //             listOfOrganizations.current = data.data
    //             setOrganizations(data.data)
    //         })
    //         .catch(err => console.log(err));
    //     }
    //     if(currentData === 'search'){
    //         if(input){
    //             fetch([process.env.REACT_APP_API_URL, `api/organizational-and-politicals?filters[organizational_and_political][$containsi]=${input}&sort[0]=organizational_and_political:asc`].join('/'))
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('line 39')
    //                 listOfOrganizations.current = data.data
    //                 setOrganizations(data.data)
                    
    //             })
    //             .catch(err => console.log(err));
    //           }else{
    //             fetch([process.env.REACT_APP_API_URL, `api/organizational-and-politicals?sort[0]=organizational_and_political:asc`].join('/'))
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('line 49')
    //                 listOfOrganizations.current = data.data
    //                 setOrganizations(data.data)
                    
    //             })
    //             .catch(err => console.log(err));
    //           }       
    //     }
    // }, [currentOffSet]); 
    
    

    // function search(){
    //     setOffset()
    //   }

    return (
        <div className="organizations">
            {/*BACK LINK */}
            { <p className='backToDiscover'>
                <BackToButton name='Researching The NWC' link='/ResearchingNWC'/>
            </p> }
            <ListOf dataType='Organizations'/>
        </div>
    )
}

export default Organizations
