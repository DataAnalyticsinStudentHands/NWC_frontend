import React, { useState } from "react";
import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";

import ThankYou from "./ThankYou";

function CorrectionsForm() {
	const [state, setState] = useState({
		formSent: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const submission = { data, template: "corrections" };
		fetch([process.env.REACT_APP_API_URL, `api/forms`].join("/"), {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(submission),
		})
    .then(setState({ formSent: true }))
    .catch(error => {
      console.log(error)
    });
	};

	return (
		<main className={styles.forms}>
			{!state.formSent ? (
				<form
					className={styles.corrections}
					onSubmit={handleSubmit(onSubmit)}
					noValidate>
					<header>
						<h1 className={styles.corrections_heading}>
							Corrections
						</h1>
						<p className={styles.corrections_p}>
							If you detected an error on our website or have more
							information about an NWC participant that you would
							like to share, please tell us about it on this page.
							We will review your contribution and make the needed
							changes. We thank you in advance for your
							contribution to our work.
						</p>
						<p className={styles.corrections_preq}>
							All fields are required
						</p>
					</header>
        <p className={styles.forms_p}> Name*</p>
        <input  placeholder="Name" {...register('Name', { required: true, pattern:/^[A-Za-z' -]+$/ })} />
        {errors?.Name?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
        {errors?.Name?.type === 'pattern' && <p className={styles.corrections_validate}> Name is invalid </p>}

          <p className={styles.forms_p}> Affiliation/Occupation*</p>
        <input  placeholder="Affiliation/Occupation" {...register('Affiliation', { required: true, pattern:/^[A-Za-z' -]+$/ })} />
        {errors?.Affiliation?.type === 'required' && <p className={styles.corrections_validate}> This field is required </p>}
        {errors?.Affiliation?.type === 'pattern' && <p className={styles.corrections_validate}> Affiliation/Occupation is invalid </p>}

          <p className={styles.forms_p}> Email*</p> 
        <input placeholder="Email" {...register('Email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" />
        {errors?.Email?.type === 'required' && <p className={styles.corrections_validate}> This field is required</p>}
        {errors?.Email?.type === 'pattern' && <p className={styles.corrections_validate}> Email is invalid </p>}

          <p className={styles.forms_p}> Name of Page Needing Correction</p>
					<input
						placeholder="Name of Page Needing Correction (please also include corresponding URL)"
						{...register("Page", { required: true })}
					/>
					{errors?.Page?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
          <p className={styles.forms_p}> Name of specific feature to be corrected</p>
					<input
						placeholder="Name of specific feature to be corrected (i.e. biography, demographic fact, interpretive essay)"
						{...register("Feature", { required: true })}
					/>
					{errors?.Feature?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
          <p className={styles.forms_p}> Corrections</p>
					<textarea
						placeholder="Corrections"
						{...register("Corrections", {
							required: true,
						})}></textarea>
					{errors?.Corrections?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
          <p className={styles.forms_p}> Source for Correction</p>
					<input
						placeholder="Source for Correction"
						{...register("Source", { required: true })}
					/>
					{errors?.Source?.type === "required" && (
						<p className={styles.corrections_validate}>
							{" "}
							This field is required{" "}
						</p>
					)}
					<input
						type="submit"
						value="Submit"
						className={styles.corrections_submit}
					/>
				</form>
			) : <ThankYou/>}
		</main>
	);
}

export default CorrectionsForm;
