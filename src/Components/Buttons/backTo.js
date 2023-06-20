import './backTo.css';
import {useHistory} from 'react-router-dom';


function BackToButton(props){
    let name = props.name
    
    const history = useHistory();
    
    return(
        name.toLowerCase() === 'previous' ? 
        <p className='back' onClick={() => history.goBack()}>
            <span className='larr'>&larr;</span> <span>Back To Previous Page</span>
        </p>
        :
        <p className='back' onClick={()=>window.location.href=props.link}>
            <span className='larr'>&larr;</span><span>BACK TO {name} PAGE</span>
        </p>
        )
    
}
export default BackToButton