import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function InquiryStudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const submission = { data, template: "contactus" };

    fetch(
      [process.env.REACT_APP_API_URL, `api/forms-inquiryparticipant`].join("/"),
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(submission),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Submission failed");
        return response.json().catch(() => null); // ok if API returns no JSON
      })
      .then(() => {
        navigate("/forms/thank-you", {
          state: {
            returnTo: "/forms/inquirystudent",
            message: "Thank you!",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className={styles.forms}>
      <form
        className={styles.corrections}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header>
          <h1 className={styles.corrections_heading}>
            Participant Inquiry Form
          </h1>
          <p className={styles.corrections_p}>Please send us a message!</p>
          <p className={styles.corrections_preq}>* Required fields</p>
        </header>
        <p className={styles.forms_p}>Name*</p>
        <input
          placeholder="Name"
          {...register("name", {
            required: true,
            pattern: /^[A-Za-z' -]+$/,
          })}
        />
        {errors?.name?.type === "required" && (
          <p className={styles.corrections_validate}>This field is required</p>
        )}
        {errors?.name?.type === "pattern" && (
          <p className={styles.corrections_validate}>Name is invalid</p>
        )}
        <p className={styles.forms_p}>Role at NWC*</p>
        <input
          placeholder="Role at NWC"
          {...register("role_at_nwc", {
            required: true,
            pattern: /^[A-Za-z' -]+$/,
          })}
        />
        {errors?.role_at_nwc?.type === "required" && (
          <p className={styles.corrections_validate}>This field is required</p>
        )}
        {errors?.Name?.type === "pattern" && (
          <p className={styles.corrections_validate}>Name is invalid</p>
        )}
        <p className={styles.forms_p}>Email*</p>
        <input
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
          type="email"
        />
        {errors?.email?.type === "required" && (
          <p className={styles.corrections_validate}>This field is required</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p className={styles.corrections_validate}>Email is invalid</p>
        )}
        <p className={styles.forms_p}> Phone</p>
        <input
          placeholder="Phone"
          {...register("phone", {
            pattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
          })}
          type="phone"
        />
        {errors?.phone?.type === "pattern" && (
          <p className={styles.corrections_validate}>Phone number is invalid</p>
        )}
        <p className={styles.forms_p}>
          Tell us a little bit about your experience at the NWC*
        </p>
        <textarea
          placeholder="Tell us a little bit about your experience at the NWC"
          {...register("experience")}
        ></textarea>
        <p className={styles.forms_p}>
          How would you like to be involved in this project?
        </p>
        <textarea
          placeholder="How would you like to be involved in this project"
          {...register("involved")}
        ></textarea>
        <p className={styles.forms_p}>
          Would you like to be interviewed about your experience?
        </p>
        <textarea
          placeholder="Would you like to be interviewed about your experience?"
          {...register("interview")}
        ></textarea>
        <p className={styles.forms_p}>
          Do you have memorabilia from the NWC that you would like help
          preserving?
        </p>
        <textarea
          placeholder="Do you have memorabilia from the NWC that you would like help preserving?"
          {...register("memorabilia")}
        ></textarea>
        <p className={styles.forms_p}>
          What more do you hope to learn from us?
        </p>
        <textarea
          placeholder="What more do you hope to learn from us?"
          {...register("more")}
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className={styles.corrections_submit}
        />
      </form>
    </main>
  );
}

export default InquiryStudentForm;
