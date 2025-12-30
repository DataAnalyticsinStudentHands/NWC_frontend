import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function InquiryEducatorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const submission = { data, template: "contactus" };
    fetch(
      [process.env.REACT_APP_API_URL, `api/forms-inquiryeducator`].join("/"),
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
            returnTo: "/forms/inquiryeducator",
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
          <h1 className={styles.corrections_heading}>Educator Inquiry Form</h1>
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
        <p className={styles.forms_p}>Title</p>
        <input placeholder="Title" {...register("title")} />
        <p className={styles.forms_p}>Affiliation*</p>
        <input
          placeholder="Affiliation"
          {...register("affiliation", {
            required: true,
            pattern: /^[A-Za-z' -]+$/,
          })}
        />
        {errors?.affiliation?.type === "required" && (
          <p className={styles.corrections_validate}>This field is required</p>
        )}
        {errors?.affiliation?.type === "pattern" && (
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
        <p className={styles.forms_p}>
          What type(s) of class(es) do you envision teaching the Sharing Stories
          project in?
        </p>
        <textarea
          className={styles.corrections_textarea}
          placeholder="What type(s) of class(es) do you envision teaching the Sharing Stories project in?"
          {...register("classes")}
        ></textarea>
        <p className={styles.forms_p}>
          How would you like your students to contribute to the project as
          original researchers?
        </p>
        <textarea
          className={styles.corrections_textarea}
          placeholder="How would you like your students to contribute to the project as original researchers"
          {...register("students")}
        ></textarea>
        <p className={styles.forms_p}>
          What guidance do you seek on the teaching site?
        </p>
        <textarea
          className={styles.corrections_textarea}
          placeholder="What guidance do you seek on teaching site?"
          {...register("guidance")}
        ></textarea>
        <p className={styles.forms_p}>
          What more do you hope to learn about our project?
        </p>
        <textarea
          className={styles.corrections_textarea}
          placeholder="What more do you hope to learn about our project?"
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

export default InquiryEducatorForm;
