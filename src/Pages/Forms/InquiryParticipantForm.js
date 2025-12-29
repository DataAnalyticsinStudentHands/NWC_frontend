import { useState } from "react";
import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";

import { ThankYouContact } from "./ThankYou";

function InquiryParticipantForm() {
	const [state, setState] = useState({
		formSent: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const submission = { data, template: "contactus" };

		fetch([process.env.REACT_APP_API_URL, `api/forms-inquiryparticipant`].join("/"), {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(submission),
		})
			.then(setState({ formSent: true }))
			.catch((error) => {
				console.log(error);
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
							Participant Inquiry Form
						</h1>
						<p className={styles.corrections_p}>
							Any questions or comments you have about our work?
							Please send us a message below!
						</p>
						<p className={styles.corrections_preq}>
							* Required fields
						</p>
					</header>
					<p className={styles.forms_p}> Name*</p>
					<input
						placeholder="Name"
						{...register("Name", {
							required: true,
							pattern: /^[A-Za-z' -]+$/,
						})}
					/>
					{errors?.Name?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
					{errors?.Name?.type === "pattern" && (
						<p className={styles.corrections_validate}>
							Name is invalid
						</p>
					)}
					<p className={styles.forms_p}> Email*</p>
					<input
						placeholder="Email"
						{...register("Email", {
							required: true,
							pattern:
								/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						})}
						type="email"
					/>
					{errors?.Email?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
					{errors?.Email?.type === "pattern" && (
						<p className={styles.corrections_validate}>
							Email is invalid
						</p>
					)}
					<p className={styles.forms_p}> Phone</p>
					<input
						placeholder="Phone"
						{...register("Phone", {
							pattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
						})}
						type="phone"
					/>
					{errors?.Phone?.type === "pattern" && (
						<p className={styles.corrections_validate}>
							Phone number is invalid
						</p>
					)}
					<p className={styles.forms_p}> Message*</p>
					<textarea
						placeholder="Message"
						{...register("Message", { required: true })}></textarea>
					{errors?.Message?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
					<input
						type="submit"
						value="Submit"
						className={styles.corrections_submit}
					/>
				</form>
			) : (
				<ThankYouContact />
			)}
		</main>
	);
}

export default InquiryParticipantForm;
