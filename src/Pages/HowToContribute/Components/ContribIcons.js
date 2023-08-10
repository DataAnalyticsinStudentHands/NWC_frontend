import oralIcon from './res/oralIcon.png'
import contributeIcon from './res/contributeIcon.png'
import techIcon from './res/techIcon.png'
import permissionIcon from './res/permissionIcon.png'
import ideaIcon from './res/ideaIcon.png'
import archivalIcon from './res/archivalIcon.png'
import iconPapers from './res/iconPapers.png'
import iconClass from './res/iconClass.png'
import './ContribIcons.css'


import { Link } from 'react-router-dom'

function ContribIcons(props){
    let state = props.data
    let type = props.type
    let howToContribute = '', technicalGuidelines = '',biographies = '', permissionDocuemnts = '', classIdeas = '' 

    if(type === 'researchers'){
        howToContribute = state.Pdf_How_to_Contribute_Oral_Histories_Students_Researchers
        biographies = state.Pdf_How_to_Contribute_Biographies_Students_Researchers
        technicalGuidelines = state.Pdf_Technical_Guidelines
        permissionDocuemnts = state.Pdf_Permission_Documents
    }
    
    if(type === 'archivists'){
        technicalGuidelines = state.Pdf_Technical_Guidelines_Archivists
        permissionDocuemnts = state.Pdf_Permission_Documents
    }
    
    if(type === 'participants'){
        howToContribute = state.Pdf_How_to_Contribute_Oral_Histories_NWCParticipants
        biographies = state.Pdf_How_to_Contribute_Biographies_NWCParticipants
        technicalGuidelines = state.Pdf_Technical_Guidelines
        permissionDocuemnts = state.Pdf_Permission_Documents
    }
    
    if(type === 'educators'){
        howToContribute = state.Pdf_How_to_Contribute_Oral_Histories_Educators
        biographies = state.Pdf_How_to_Contribute_Biographies_Educators
        classIdeas = state.Pdf_Classroom_Ideas
        technicalGuidelines = state.Pdf_Technical_Guidelines
        permissionDocuemnts = state.Pdf_Permission_Documents
    }
    
    if(type === 'students'){
        howToContribute = state.Pdf_How_to_Contribute_Oral_Histories_Students_Researchers
        biographies = state.Pdf_How_to_Contribute_Biographies_Students_Researchers
        technicalGuidelines = state.Pdf_Technical_Guidelines
        permissionDocuemnts = state.Pdf_Permission_Documents
    }

    return(
        <div>
        <div className="resourceResearchersIcons">
            {howToContribute?
                <Link to={`/pdfviewer/${howToContribute}`}>
                <div className="iconContainer">
                    <img src={oralIcon} alt="_"></img>
                    <p>How to Contribute Oral Histories</p>
                </div>
            </Link>
            :<Link to="/forms/donatepapers">
                    <div className="iconContainer">
                        <img src={archivalIcon} alt="_"></img>
                        <p>How to Contribute Archival Information</p>
                    </div>
                </Link>
                 
            }
            {
                biographies?
                    <Link to={`/pdfviewer/${biographies}`}>
                        <div className="iconContainer">
                            <img src={contributeIcon} alt="_"></img>
                            <p>How to Contribute Biographies</p>
                        </div>
                    </Link>
                    :''
            }
            
            <Link to={`/pdfviewer/${technicalGuidelines}`}>
                <div className="iconContainer">
                    <img src={techIcon} alt="_"></img>
                    <p>Technical Guidelines</p>
                </div>
            </Link>
            <a href={`${permissionDocuemnts}`} download>
                <div className="iconContainer">
                    <img src={permissionIcon} alt="_"></img>
                    <p>Permissions Documents</p>
                </div>
            </a>
            {
                type === 'participants'?
                <Link to="/forms/donatepapers">
                    <div className="iconContainer">
                        <img src={iconPapers} alt="_"></img>
                        <p>HOW TO DONATE YOUR PAPERS</p>  
                    </div>
                </Link>
                :''
            }
            {
                classIdeas?
                <Link to={`/pdfviewer/${classIdeas}`}>
                    <div className="iconContainer">
                        <img src={iconClass} alt="_"></img>
                        <p>Classroom Ideas</p>
                    </div>
                </Link>
                :''
            }


            
        </div>
            {/* MORE IDEAS CONTAINER */}
            <Link to="/forms/moreideas">
                <div className="ideaContainerArchivists">
                    <div className="ideaContainerIcon">
                        <img src={ideaIcon} alt="_"></img>
                    </div>
                    <div className="ideaContainerText">
                        <h1>HAVE MORE IDEAS? TELL US HERE</h1>
                    </div>
                </div>
            </Link>
        </div>
        
    )
}
export default ContribIcons;