
import archivists_button from '../../Pages/HowToContribute/res/archivist_button.png'
import educators_button from '../../Pages/HowToContribute/res/educators_button.png'
import nwx_participants_button from '../../Pages/HowToContribute/res/nwc_participants_button.png'
import researcher_button from '../../Pages/HowToContribute/res/researcher_button.png'
import students_button from '../../Pages/HowToContribute/res/students_button.png'

import './ResourcesFor.css'

function ResourcesFor(props){
    let resourceText = props.resourceText
    let name = props.type
    let buttonImg;

    switch (props.type){
        case 'researchers':
            buttonImg = researcher_button
            break
        case 'archivists':
            buttonImg = archivists_button
            break
        case 'participants':
            buttonImg = nwx_participants_button
            break
        case 'educators':
            buttonImg = educators_button
            break
        case 'students':
            buttonImg = students_button
            break
        default:
            console.log('Button type not found')
    }


    return(
        <div className="banner">
            <div className="banner_button">
                <img src={buttonImg} alt= {`${name} Button`} />
            </div>
            <div className="banner_header">
                <h1>RESOURCES FOR {name}</h1>
                <div className="banner_border"></div>
                <p>{resourceText}</p>
            </div>
            {/* <LCard text={banner_card} /> */}

        </div>
        
)
}

export default ResourcesFor;