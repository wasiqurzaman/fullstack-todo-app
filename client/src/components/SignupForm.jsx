import { useForm } from "react-hook-form";
import styles from "../styles/SignupForm.module.css";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.h2}>New user signup</h2>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          username
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          {...register("username", {
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 4,
              message: "username must be atleast 4 characters long",
            },
            maxLength: {
              value: 20,
              message: "username can not exceed 20 characters",
            },
          })}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username?.message}</p>
        )}
      </div>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          email
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          type="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email?.message}</p>
        )}
      </div>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          password
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          type="password"
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters long",
            },
            maxLength: {
              value: 16,
              message: "Password can not exceed 16 characters",
            },
            required: { value: true, message: "Password is required" },
          })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password?.message}</p>
        )}
      </div>

      <button className={styles.btn} type="submit">
        Sign up
      </button>
    </form>
  );
}
