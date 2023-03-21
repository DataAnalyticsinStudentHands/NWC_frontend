import './submit.css'

function SubmitButton(props){
    let buttonText = props.buttonName
    let func = props.func
    if(func === 'submit'){
        return(
            <button className='corrections_submit' type='submit'>{buttonText}</button>
        )
    }
    if(func === 'download'){
        var FileSaver = require('file-saver')
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