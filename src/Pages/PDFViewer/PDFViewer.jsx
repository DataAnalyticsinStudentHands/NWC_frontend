import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

import SubmitButton from '../../Components/Buttons/submit';
import BackToButton from '../../Components/Buttons/backTo';

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import styles from './PDFViewer.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function PDFViewer() {
  const { pdffile } = useParams();
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const fileURL = `${import.meta.env.VITE_API_URL}/uploads/${pdffile}`;

  return (
    <main className={styles.pdf}>
      <div className={styles.backButton}>
        <BackToButton name="Previous" />
      </div>

      <Document
        className={styles.pdf__document}
        file={fileURL}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              height={900}
              className={styles.pdf__page}
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />
          ))
        }

        <div className={styles.dwButton}>
          <SubmitButton
            fileName={fileURL}
            pdfFile={pdffile}
            buttonName="Download"
            func="download"
          />
        </div>
      </Document>
    </main>
  );
}

export default PDFViewer;