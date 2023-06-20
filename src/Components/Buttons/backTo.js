import './backTo.css';
import {useHistory} from 'react-router-dom';


function BackToButton(props){
    let name = props.name
    
    const history = useHistory();
    
    return(
        name.toLowerCase() === 'previous' ? 
        <p className='back' onClick={() => history.goBack()}>
            <span className='larr'>&larr;</span> <p>Back To Previous Page</p>
        </p>
        :
        // <div>
        //     <Link  className='larr' to={props.link}>&larr; <p>BACK TO DISCOVER PAGE</p></Link>
        // </div>
        <p className='back' onClick={()=>window.location.href=props.link}>
            <span className='larr'>&larr;</span><p>BACK TO {name} PAGE</p>
        </p>
        )
    
}
export default BackToButton