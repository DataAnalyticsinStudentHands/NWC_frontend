import { useLocation, Link } from "react-router-dom";
import styles from "./Forms.module.css";

function ThankYouPage() {
  const location = useLocation();

  const message = location.state?.message || "Thank you!";
  const returnTo = location.state?.returnTo || "/forms/contactus";

  return (
    <main className={styles.forms}>
      {/* reuse the same styling as the form */}
      <section className={styles.corrections}>
        <h1 className={styles.corrections_heading}>{message}</h1>

        <p className={styles.corrections_p}>Your submission was received.</p>

        <Link to={returnTo}>
          <input
            type="button"
            className={styles.corrections_submit}
            value="Back to submission form"
          />
        </Link>
      </section>
    </main>
  );
}

export default ThankYouPage;
