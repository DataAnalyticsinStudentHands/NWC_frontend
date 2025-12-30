import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function InquiryResearcherForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const submission = { data, template: "contactus" };
    fetch(
      [process.env.REACT_APP_API_URL, `api/forms-inquiryresearcher`].join("/"),
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
            returnTo: "/forms/inquiryresearcher",
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
            Researcher Inquiry Form
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
        <p className={styles.forms_p}>Phone</p>
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
          What current or past projects connect to the history of the 1977
          National Women’s Conference?
        </p>
        <textarea
          placeholder="What current or past projects connect to the history of the 1977 National Women’s Conference?"
          {...register("projects")}
        ></textarea>
        <p className={styles.forms_p}>
          What interests you about the Sharing Stories from 1977 project? How
          might you like to get involved?
        </p>
        <textarea
          placeholder="What interests you about the Sharing Stories from 1977 project? How might you like to get involved?"
          {...register("interest")}
        ></textarea>
        <p className={styles.forms_p}>
          What guidance might you need on how to use the Sharing Stories from
          1977 site for your research?
        </p>
        <textarea
          placeholder="What guidance might you need on how to use the Sharing Stories from 1977 site for your research?"
          {...register("guidance")}
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

export default InquiryResearcherForm;
