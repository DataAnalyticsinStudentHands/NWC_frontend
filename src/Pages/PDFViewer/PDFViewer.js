import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import styles from './PDFViewer.module.css';
import VARIABLES from '../../config/.env';

function PDFViewer() {
  // params to set the pdf file
  let { pdffile } = useParams();
  const history = useHistory();

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <main className={styles.pdf}>
      <p className={styles.pdf__back} onClick={() => history.goBack()}>
        <span className={styles.pdf__larr}>&larr;</span> Back To Previous Page
      </p>

      <Document
        className={styles.pdf__document}
        file={`${VARIABLES.fetchBaseUrl}/uploads/${pdffile}`}
        options={{ 
          workerSrc: "/pdf.worker.js",
          verbosity: pdfjs.VerbosityLevel.ERRORS
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            className={styles.pdf__page}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={true} />
        ))}
      </Document>
    </main>
  );
}

export default PDFViewer;
