import React, { useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
// import axios from 'axios';

import {ThankYouMoreIdeas} from './ThankYou';

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
    submission.form = "MOREIDEAS";
    console.log(submission)

  //   axios.post([VARIABLES.fetchBaseUrl, `forms/email`].join('/'), JSON.stringify(submission))
  //       .then(response => setState({
  //         formSent: true
  //       }));
  // }

  fetch([VARIABLES.fetchBaseUrl, `api/form-moreidea`].join('/'),{
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
        <h1 className={styles.corrections_heading}>Have more Ideas? Tell us here</h1>
        <p className={styles.corrections_p}>
        Is there an additional feature or concept you think should be included in our website? Would you like us to collect additional categories of biographies? Should we expand the range of our demographic datasets? Should we build additional timeline features? If you have ideas about how to improve Sharing Stories from 1977 for teachers, researchers, archivists, NWC participants, or students please tell us here.
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
      <input placeholder="Address" {...register('Address', { required: true })}/>
      {errors?.Address?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input placeholder="Phone" {...register('Phone', { required: true })}/>
      {errors?.Phone?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input placeholder="Email" {...register('Email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" />
      {errors?.Email?.type === 'required' && <p className={styles.corrections_validate}> This field is required</p>}
      {errors?.Email?.type === 'pattern' && <p className={styles.corrections_validate}> Email is invalid </p>}
      <textarea
          placeholder="Comments" {...register('Comments', { required: true })}
          ></textarea>
        {errors?.Comments?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
      <input type="submit" value="Submit" className={styles.corrections_submit} />
    </form> : null}
    {state.formSent ? <ThankYouMoreIdeas /> : null}
    </main>
  );
}

export default CorrectionsForm;
