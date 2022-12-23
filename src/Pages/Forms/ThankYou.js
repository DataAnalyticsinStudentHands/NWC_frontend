import React from 'react';
import styles from './Forms.module.css';

function ThankYou() {
  return (
    <form className={styles.corrections}>
      <header>
        <h1 className={styles.corrections_heading}>Thank you</h1>
        <p className={styles.corrections_p}>
          Your submission has been submitted for review
        </p>
      </header>

      { <a href='./CorrectionsForm'> <input
        type="button"
        className={styles.corrections_submit}
        value="Submit another correction"      
      /> </a> }
    </form>
  );
}

export default ThankYou;