import './submit.css'
import FileSaver from 'file-saver';

function SubmitButton(props){
    let buttonText = props.buttonName
    let func = props.func
    if(func === 'submit'){
        return(
            <button className='corrections_submit' type='submit'>{buttonText}</button>
        )
    }
    if(func === 'download'){
        let file = props.fileName
        let fileName = props.pdfFile
        const downloadFile = () =>{
            FileSaver.saveAs(file, fileName)
        }
        return(
            <button className='corrections_submit' onClick={downloadFile}>{buttonText}</button>
        )
    }
    
}
export default SubmitButton