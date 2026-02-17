import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Hello, this is Podorozhnyky`s app</h1>
          <p>This app is a travel app that helps you plan your trips.</p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/register"
          >
            Register
          </a>
          <a
            className={styles.secondary}
            href="/login"
          >
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
