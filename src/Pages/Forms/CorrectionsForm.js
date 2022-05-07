import React, { useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ThankYou from './ThankYou';

import VARIABLES from "../../config/.env.js";

function CorrectionsForm() {

  const [state, setState] = useState({
     formSent: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  
  const onSubmit = (data) => {

    let submission = data;
    submission.form = "CORRECTIONS"

    axios.post([VARIABLES.fetchBaseUrl, `forms/email`].join('/'), JSON.stringify(submission))
        .then(response => setState({
          formSent: true
        }));
  }

  return (
    <main className={styles.forms}>
    {!state.formSent ? 
    <form className={styles.corrections} onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h1 className={styles.corrections_heading}>Corrections</h1>
        <p className={styles.corrections_p}>
        If you detected an error on our website or have more information about an NWC participant that you would like to share, please tell us about it on this page. We will review your contribution and make the needed changes. We thank you in advance for your contribution to our work.

        </p>
      </header>

      <input placeholder="Name" {...register('name', { required: true })} />
      {errors.name?.type === 'required' && "Name is required"}
      <input
        placeholder="Affiliation/Occupation"
        {...register('affiliation')}
      />
      <input placeholder="Email" {...register('email')} type="email" />
      <input
        placeholder="Name of Page Needing Correction (please also include corresponding URL)"
        {...register('page')}
      />
      <input
        placeholder="Name of specific feature to be corrected (i.e. biography, demographic fact, interpretive essay)"
        {...register('feature')}
      />
      <textarea
        placeholder="Corrections"
        {...register('corrections')}
      ></textarea>
      <input placeholder="Source for Correction" {...register('source')} />
      <input type="submit" className={styles.corrections_submit} />
    </form> : null}
    {state.formSent ? <ThankYou /> : null}
    </main>
  );
}

export default CorrectionsForm;
