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
      [process.env.REACT_APP_API_URL, `api/forms-inquirystudent`].join("/"),
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
            Student Researcher Inquiry Form
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
        <p className={styles.forms_p}>School*</p>
        <input
          placeholder="School"
          {...register("school", {
            required: true,
            pattern: /^[A-Za-z' -]+$/,
          })}
        />
        {errors?.school?.type === "required" && (
          <p className={styles.corrections_validate}>This field is required</p>
        )}
        {errors?.school?.type === "pattern" && (
          <p className={styles.corrections_validate}>School is invalid</p>
        )}
        <p className={styles.forms_p}>Year*</p>
        <input
          placeholder="Year"
          {...register("year", {
            required: true,
            pattern: /^[A-Za-z' -]+$/,
          })}
        />
        {errors?.year?.type === "required" && (
          <p className={styles.corrections_validate}>This field is required</p>
        )}
        {errors?.year?.type === "pattern" && (
          <p className={styles.corrections_validate}>Year is invalid</p>
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
        <p className={styles.forms_p}>
          Tell us a little bit about why you are interested in this period of history.
        </p>
        <textarea
          placeholder="Tell us a little bit about why you are interested in this period of history"
          {...register("why")}
        ></textarea>
        <p className={styles.forms_p}>
          What research, writing, or digital skills do you have?
        </p>
        <textarea
          placeholder="What research, writing, or digital skills do you have?"
          {...register("skills")}
        ></textarea>
        <p className={styles.forms_p}>
          How would you like to be involved in this project?
        </p>
        <textarea
          placeholder="How would you like to be involved in this project?"
          {...register("how")}
        ></textarea>
        <p className={styles.forms_p}>
          Are you open to volunteering your time?
        </p>
        <textarea
          placeholder="Are you open to volunteering your time?"
          {...register("time")}
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
