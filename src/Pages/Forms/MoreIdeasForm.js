import React, { useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
// import axios from 'axios';

import ThankYou from './ThankYou';

import VARIABLES from "../../config/.env.js";

function MoreIdeasForm() {

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
    submission.form = "MORE IDEAS"

    // axios.post([VARIABLES.fetchBaseUrl, `api/forms/email`].join('/'), JSON.stringify(submission))
    //     .then(response => setState({
    //       formSent: true
    //     }));

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
        <h1 className={styles.corrections_heading}>Have more ideas? Tell us here</h1>
        <p className={styles.corrections_p}>
        Is there an additional feature or concept you think should be included in our website? Would you like us to collect additional categories of biographies? Should we expand the range of our demographic datasets? Should we build additional timeline features? If you have ideas about how to improve Sharing Stories from 1977 for teachers, researchers, archivists, NWC participants, or students please tell us here.
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

export default MoreIdeasForm;
