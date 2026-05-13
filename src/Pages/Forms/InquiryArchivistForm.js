import styles from "./Forms.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function InquiryArchivistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const submission = { data, template: "contactus" };
    fetch(
      [process.env.REACT_APP_API_URL, `api/forms-inquiryarchivist`].join("/"),
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
            returnTo: "/forms/inquiryarchivist",
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
          <h1 className={styles.corrections_heading}>Archivist Inquiry Form</h1>
          <p className={styles.corrections_p}>
            One of major goals in this project is to reunify the 1977 National
            Women’s Conference archive. We aim to do so along two avenues.
            First, we have created a{" "}
            <a href="https://dash.cs.uh.edu/uploads/Collections_Guide_Revise_NBY_V10_2023_06_26_af736f3ea9.pdf">
              Collections Guide
            </a>{" "}
            available on our About Project page as a resource for researchers.
            Second, our Into the Archives page, currently in development, will
            provide extended information on NWC related archives and will also
            regularly feature articles about collections. We need you to help us
            build both.{" "}
          </p>
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
          What collection(s) does your library contain that are related to a
          participant of or the general history of the 1977 National Women’s
          Conference?
        </p>
        <textarea
          placeholder="What collection(s) does your library contain that are related to a participant of or the general history of the 1977 National Women’s Conference?"
          {...register("collections")}
        ></textarea>
        <p className={styles.forms_p}>
          Please take a look at our{" "}
          <a href="https://sharingstories1977.uh.edu/pdfviewer/Collections_Guide_Revise_NBY_V10_2023_06_26_af736f3ea9.pdf">
            Collections Guide
          </a>
          . Are your collection(s) included? If so, do let us know if any
          corrections need to be made. If not, please alert us and we will add
          your collections to this document revised periodically.
        </p>
        <textarea
          placeholder="Please take a look at our Collections Guide. Are your collection(s) included?"
          {...register("corrections")}
        ></textarea>
        <p className={styles.forms_p}>
          We are also creating an archive map to be featured on our Into the
          Archives page that will include information about archives alongside
          digitized materials. Do you have an interest in having your
          collection(s) included? Do you have part or all of these collections
          digitized, or have plans to digitize?
        </p>
        <textarea
          placeholder="Do you have an interest in having your collection(s) included?"
          {...register("archives")}
        ></textarea>
        <p className={styles.forms_p}>
          Would you be interested in collaborating on an “archive story” about
          your NWC collection(s) to be featured on our site?
        </p>
        <textarea
          placeholder="Would you be interested in collaborating on an “archive story” about your NWC collection(s) to be featured on our site? "
          {...register("story")}
        ></textarea>
        <p className={styles.forms_p}>
          Would you like to be involved in our oral history project? Would you
          be interested in joint programming? Or have another idea of how to
          collaborate to share?
        </p>
        <textarea
          placeholder="Would you like to be involved in our oral history project? Would you be interested in joint programming?"
          {...register("oralHistory")}
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

export default InquiryArchivistForm;
