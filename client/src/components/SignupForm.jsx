import { useForm } from "react-hook-form";
import styles from "./SignupForm.module.css";

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
      <h2 className={styles.h2}>Add New Task</h2>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          Title
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          {...register("username", {
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username can not exceed 16 characters",
            },
          })}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username?.message}</p>
        )}
      </div>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          Title
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
        />
        {errors.title && (
          <p className={styles.error}>{errors.email?.message}</p>
        )}
      </div>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          Title
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters long",
            },
            maxLength: {
              value: 16,
              message: "Password can not exceed 16 characters",
            },
            required: { value: true, message: "Title is required" },
          })}
        />
        {errors.title && (
          <p className={styles.error}>{errors.title?.message}</p>
        )}
      </div>

      <button className={styles.btn} type="submit">
        Sign up
      </button>
    </form>
  );
}
