import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function MoreideasForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const submission = { data, template: "moreideas" };

    fetch([process.env.REACT_APP_API_URL, `api/form-moreidea`].join("/"), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(submission),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Submission failed");
        return response.json().catch(() => null); // ok if API returns no JSON
      })
      .then(() => {
        navigate("/forms/thank-you", {
          state: {
            returnTo: "/forms/moreideas",
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
            Have more Ideas? Tell us here
          </h1>
          <p className={styles.corrections_p}>
            Is there an additional feature or concept you think should be
            included in our website? Would you like us to collect additional
            categories of biographies? Should we expand the range of our
            demographic datasets? Should we build additional timeline features?
            If you have ideas about how to improve Sharing Stories from 1977 for
            teachers, researchers, archivists, NWC participants, or students
            please tell us here.
          </p>
          <p className={styles.corrections_preq}> All fields are required </p>
        </header>
        <p className={styles.forms_p}> Name*</p>
        <input
          placeholder="Name"
          {...register("Name", { required: true, pattern: /^[A-Za-z' -]+$/ })}
        />
        {errors?.Name?.type === "required" && (
          <p className={styles.corrections_validate}>
            {" "}
            This field is required{" "}
          </p>
        )}
        {errors?.Name?.type === "pattern" && (
          <p className={styles.corrections_validate}> Name is invalid </p>
        )}

        <p className={styles.forms_p}> Affiliation/Occupation*</p>
        <input
          placeholder="Affiliation/Occupation"
          {...register("Affiliation", {
            required: true,
            pattern: /^[A-Za-z' -]+$/,
          })}
        />
        {errors?.Affiliation?.type === "required" && (
          <p className={styles.corrections_validate}>
            {" "}
            This field is required{" "}
          </p>
        )}
        {errors?.Affiliation?.type === "pattern" && (
          <p className={styles.corrections_validate}>
            {" "}
            Affiliation/Occupation is invalid{" "}
          </p>
        )}

        <p className={styles.forms_p}> Address*</p>
        <input
          placeholder="Address"
          {...register("Address", { required: true })}
        />
        {errors?.Address?.type === "required" && (
          <p className={styles.corrections_validate}>
            {" "}
            This field is required{" "}
          </p>
        )}

        <p className={styles.forms_p}> Phone</p>
        <input
          placeholder="Phone"
          {...register("Phone", {
            required: true,
            pattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
          })}
          type="phone"
        />
        {errors?.Phone?.type === "required" && (
          <p className={styles.corrections_validate}>
            {" "}
            This field is required{" "}
          </p>
        )}
        {errors?.Phone?.type === "pattern" && (
          <p className={styles.corrections_validate}>
            {" "}
            Phone number is invalid{" "}
          </p>
        )}

        <p className={styles.forms_p}> Email*</p>
        <input
          placeholder="Email"
          {...register("Email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
          type="email"
        />
        {errors?.Email?.type === "required" && (
          <p className={styles.corrections_validate}> This field is required</p>
        )}
        {errors?.Email?.type === "pattern" && (
          <p className={styles.corrections_validate}> Email is invalid </p>
        )}

        <p className={styles.forms_p}> Comments*</p>
        <textarea placeholder="Comments" {...register("Comments")}></textarea>
        {errors?.Comments?.type === "required" && (
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
    </main>
  );
}

export default MoreideasForm;
