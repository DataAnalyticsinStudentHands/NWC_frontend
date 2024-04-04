import { useState } from "react";
import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";

import { ThankYouContact } from "./ThankYou";

function HowToDonatePapersForm() {
	const [state, setState] = useState({
		formSent: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const submission = { data, template: "donatepapers" };
		fetch(
			[process.env.REACT_APP_API_URL, `api/forms-donatepaper`].join("/"),
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(submission),
			}
		)
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
							How to Donate Your Papers
						</h1>
						<p className={styles.corrections_p}>
							Are you a former NWC participant? Do you have the
							records of a family member or friend who was
							involved with the NWC? Would you like to share your
							materials with scholars and students interested in
							the NWC? Tell us about your materials here, and we
							will connect you with archivists who can help
							preserve your important work for generations to
							come.
						</p>
					</header>

					<p className={styles.forms_p}> Name*</p>
					<input
						placeholder="Name"
						{...register("name", {
							required: true,
							pattern: /^[A-Za-z' -]+$/,
						})}
					/>
					{errors?.name?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
					{errors?.name?.type === "pattern" && (
						<p className={styles.corrections_validate}>
							Name is invalid
						</p>
					)}

					<p className={styles.forms_p}> Role at NWC</p>
					<input
						placeholder="Role at NWC"
						{...register("role_at_nwc")}
					/>

					<p className={styles.forms_p}> Address</p>
					<input placeholder="Address" {...register("address")} />

					<p className={styles.forms_p}> Phone</p>
					<input
						placeholder="Phone"
						{...register("phone", {
							pattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
						})}
						type="phone"
					/>
					{errors?.phone?.type === "pattern" && (
						<p className={styles.corrections_validate}>
							Phone number is invalid
						</p>
					)}

					<p className={styles.forms_p}> Email*</p>
					<input
						placeholder="Email"
						{...register("email", {
							required: true,
							pattern:
								/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						})}
						type="email"
					/>
					{errors?.email?.type === "required" && (
						<p className={styles.corrections_validate}>
							This field is required
						</p>
					)}
					{errors?.email?.type === "pattern" && (
						<p className={styles.corrections_validate}>
							Email is invalid
						</p>
					)}

					<p className={styles.forms_p}> Comments*</p>
					<textarea
						placeholder="Comments"
						{...register("comments")}></textarea>
					{errors?.comments?.type === "required" && (
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

export default HowToDonatePapersForm;
