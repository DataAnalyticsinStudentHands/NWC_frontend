import oralIcon from '../Pages/HowToContribute/res/oralIcon.png'
import contributeIcon from '../Pages/HowToContribute/res/contributeIcon.png'
import techIcon from '../Pages/HowToContribute/res/techIcon.png'
import permissionIcon from '../Pages/HowToContribute/res/permissionIcon.png'
import ideaIcon from '../Pages/HowToContribute/res/ideaIcon.png'
import archivalIcon from '../Pages/HowToContribute/res/archivalIcon.png'
import iconPapers from '../Pages/HowToContribute/res/iconPapers.png'
import iconClass from '../Pages/HowToContribute/res/iconClass.png'
import './contributeIcons.css'


import { Link } from 'react-router-dom'

function contributeIcons(props){
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
                <Link to={`PDFViewer/${howToContribute}`}>
                <div className="iconContainer">
                    <img src={oralIcon} alt="_"></img>
                    <p>How to Contribute Oral Histories</p>
                </div>
            </Link>
            :<Link to="/Forms/HowToDonatePapersForm">
                    <div className="iconContainer">
                        <img src={archivalIcon} alt="_"></img>
                        <p>How to Contribute Archival Information</p>
                    </div>
                </Link>
                 
            }
            {
                biographies?
                    <Link to={`PDFViewer/${biographies}`}>
                        <div className="iconContainer">
                            <img src={contributeIcon} alt="_"></img>
                            <p>How to Contribute Biographies</p>
                        </div>
                    </Link>
                    :''
            }
            
            <Link to={`PDFViewer/${technicalGuidelines}`}>
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
                <Link to="/Forms/HowToDonatePapersForm">
                    <div className="iconContainer">
                        <img src={iconPapers} alt="_"></img>
                        <p>HOW TO DONATE YOUR PAPERS</p>  
                    </div>
                </Link>
                :''
            }
            {
                classIdeas?
                <Link to={`PDFViewer/${classIdeas}`}>
                    <div className="iconContainer">
                        <img src={iconClass} alt="_"></img>
                        <p>Classroom Ideas</p>
                    </div>
                </Link>
                :''
            }


            
        </div>
            {/* MORE IDEAS CONTAINER */}
            <Link to="/Forms/MoreIdeasForm">
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
export default contributeIcons;