import React, { useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
// import axios from 'axios';

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

    let submission = {data};
    submission.form = "CORRECTIONS";
    console.log(submission)

  //   axios.post([VARIABLES.fetchBaseUrl, `forms/email`].join('/'), JSON.stringify(submission))
  //       .then(response => setState({
  //         formSent: true
  //       }));
  // }

  fetch([VARIABLES.fetchBaseUrl, `api/forms`].join('/'),{
    method:'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body:JSON.stringify(submission)
    })
    .then(response => setState({formSent:true}))
    
  }

  return (
    <main className={styles.forms}>
    {!state.formSent ? 
    <form className={styles.corrections} onSubmit={handleSubmit(onSubmit)} noValidate>
      <header>
        <h1 className={styles.corrections_heading}>Corrections</h1>
        <p className={styles.corrections_p}>
        If you detected an error on our website or have more information about an NWC participant that you would like to share, please tell us about it on this page. We will review your contribution and make the needed changes. We thank you in advance for your contribution to our work.
        </p>
        <p className={styles.corrections_preq}> All fields are required </p>
      </header>

      <input  placeholder="Name" {...register('Name', { required: true })} />
      {errors?.Name?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input
        placeholder="Affiliation/Occupation"
        {...register('Affiliation', { required: true })}
      />
      {errors?.Affiliation?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input placeholder="Email" {...register('Email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" />
      {errors?.Email?.type === 'required' && <p className={styles.corrections_validate}> This field is required</p>}
      {errors?.Email?.type === 'pattern' && <p className={styles.corrections_validate}> Email is invalid </p>}
      <input
        placeholder="Name of Page Needing Correction (please also include corresponding URL)"
        {...register('Page', { required: true })}
      />
      {errors?.Page?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input
        placeholder="Name of specific feature to be corrected (i.e. biography, demographic fact, interpretive essay)"
        {...register('Feature', { required: true })}
      />
      {errors?.Feature?.type === 'required' && <p className={styles.corrections_validate}> This field is required</p>}
      <textarea
        placeholder="Corrections"
        {...register('Corrections', { required: true })}
      ></textarea>
      {errors?.Corrections?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input placeholder="Source for Correction" {...register('Source', { required: true })} />
      {errors?.Source?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input type="submit" value="Submit" className={styles.corrections_submit} />
    </form> : null}
    {state.formSent ? <ThankYou /> : null}
    </main>
  );
}

export default CorrectionsForm;
