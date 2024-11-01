import { useForm } from "react-hook-form";
import styles from "../styles/SigninForm.module.css";

export default function SignInForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.h2}>Sign in</h2>
      <div className={styles.titleDiv}>
        <input
          className={`${styles.input} ${styles.title}`}
          {...register("username")}
          placeholder="username or email"
        />
      </div>
      <div className={styles.titleDiv}>
        <input
          className={`${styles.input} ${styles.title}`}
          {...register("password")}
          placeholder="password"
        />
      </div>

      <button className={styles.btn} type="submit">
        Login
      </button>
    </form>
  );
}