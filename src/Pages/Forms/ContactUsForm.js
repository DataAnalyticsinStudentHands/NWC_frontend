import React, { useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';

import {ThankYouContact} from './ThankYou';

function ContactUsForm() {

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
      submission.form = "CONTACTUS";
      console.log(submission)
  
    fetch([process.env.REACT_APP_API_URL, `api/contact`].join('/'),{
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
          <h1 className={styles.corrections_heading}>Contact Us</h1>
          <p className={styles.corrections_p}>
          Any questions or comments you have about our work? Please send us a message below!
          </p>
          <p className={styles.corrections_preq}> * Required fields </p>
        </header>
        <p className={styles.forms_p}> Name*</p>
        <input  placeholder="Name" {...register('Name', { required: true })} />
        {errors?.Name?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
        <p className={styles.forms_p}> Email*</p> 
        <input placeholder="Email" {...register('Email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" />
        {errors?.Email?.type === 'required' && <p className={styles.corrections_validate}> This field is required</p>}
        {errors?.Email?.type === 'pattern' && <p className={styles.corrections_validate}> Email is invalid </p>}
        <p className={styles.forms_p}> Phone</p>
        <input placeholder="Phone" {...register('Phone')}  />
        <p className={styles.forms_p}> Message*</p>
        <textarea
          placeholder="Message" {...register('Message', { required: true })}
          ></textarea>
        {errors?.Message?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
        <input type="submit" value="Submit" className={styles.corrections_submit} />

      </form> : null}
      {state.formSent ? <ThankYouContact /> : null}
      </main>
    );
  }
  
  export default ContactUsForm;
  