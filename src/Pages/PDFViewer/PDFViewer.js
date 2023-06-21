import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import SubmitButton from '../../Components/Buttons/submit';
// import PDFDownload from './PDFDownload'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import styles from './PDFViewer.module.css';
import VARIABLES from '../../config/.env';
import BackToButton from '../../Components/Buttons/backTo';

function PDFViewer() {
  // params to set the pdf file
  let { pdffile } = useParams();
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  let fileURL = `${process.env.REACT_APP_API_URL}/uploads/${pdffile}`
 
  return (
    <main className={styles.pdf}>
      {/* <p className={styles.pdf__back} onClick={() => history.goBack()}>
        <span className={styles.pdf__larr}>&larr;</span> Back To Previous Page
        
      </p> */}
      <div className={styles.backButton}>
        <BackToButton name='Previous'/>
      </div>
      
      <Document
        className={styles.pdf__document}
        file={fileURL}
        options={{ 
          workerSrc: "/pdf.worker.js",
          verbosity: pdfjs.VerbosityLevel.ERRORS
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            height={900}
            className={styles.pdf__page}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={true} />
        ))}
        <div className={styles.dwButton}>
          <SubmitButton fileName ={fileURL} pdfFile = {pdffile} buttonName='Download' func='download'/>
        </div>
      </Document>
      
    </main>
  );
}

export default PDFViewer;
