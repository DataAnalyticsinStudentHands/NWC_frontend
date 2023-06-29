import React, { useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
// import axios from '';

import ThankYou from './ThankYou';

import VARIABLES from "../../config/.env.js";

function HowToDonatePapersForm() {

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
    submission.form = "DONATE PAPERS"

  //   axios.post([VARIABLES.fetchBaseUrl, `api/forms/email`].join('/'), JSON.stringify(submission))
  //       .then(response => setState({
  //         formSent: true
  //       }));
  // }

  fetch([VARIABLES.fetchBaseUrl, `api/forms/email`].join('/'),{
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
    <form className={styles.corrections} onSubmit={handleSubmit(onSubmit)}>
      <header>
        <h1 className={styles.corrections_heading}>How to Donate Your Papers</h1>
        <p className={styles.corrections_p}>
        Are you a former NWC participant? Do you have the records of a family member or friend who was involved with the NWC? Would you like to share your materials with scholars and students interested in the NWC? Tell us about your materials here, and we will connect you with archivists who can help preserve your important work for generations to come.
        </p>
      </header>

      <input placeholder="Name" {...register('name', { required: true })} />
      {errors.name?.type === 'required' && "Name is required"}
      <input
        placeholder="Role at NWC"
        {...register('role')}
      />
      <input
        placeholder="Address"
        {...register('address')}
      />
      <input
        placeholder="Telephone"
        {...register('telephone')}
      />
      <input placeholder="Email" {...register('email')} type="email" />
      <textarea
        placeholder="Comments"
        {...register('Comment')}
      ></textarea>
      <input type="submit" className={styles.corrections_submit} />
    </form> : null}
    {state.formSent ? <ThankYou /> : null}
    </main>
  );
}

export default HowToDonatePapersForm;