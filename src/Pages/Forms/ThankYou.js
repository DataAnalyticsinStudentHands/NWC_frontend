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
      { <a href='corrections'> <input
        type="button"
        className={styles.corrections_submit}
        value="Back to submission page"      
      /> </a> }
    </form>
  );
}

function ThankYouContact() {
  return (
    <form className={styles.corrections}>
      <header>
        <h1 className={styles.corrections_heading}>Thank you</h1>
        <p className={styles.corrections_p}>
          Your submission has been submitted for review
        </p>
      </header>
      { <a href='contactus'> <input
        type="button"
        className={styles.corrections_submit}
        value="Back to submission page"      
      /> </a> }
    </form>
  );
}

function ThankYouMoreIdeas() {
  return (
    <form className={styles.corrections}>
      <header>
        <h1 className={styles.corrections_heading}>Thank you</h1>
        <p className={styles.corrections_p}>
          Your submission has been submitted for review
        </p>
      </header>
      { <a href='moreideas'> <input
        type="button"
        className={styles.corrections_submit}
        value="Back to submission page"      
      /> </a> }
    </form>
  );
}

export default ThankYou;
export {ThankYouContact, ThankYouMoreIdeas}