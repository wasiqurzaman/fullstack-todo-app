import { useForm } from "react-hook-form";
import styles from "./SignupForm.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
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

  const { signup } = useAuth();

  async function onSubmit(data) {
    const res = await signup(data);
    if (!res.ok) throw new Error("Failed to sign in");
    navigate("/tasks");
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.h2}>New user signup</h2>
      <div className={styles.inputCont}>
        <label className={styles.label} htmlFor="">
          username
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          type="text"
          placeholder="choose a username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 4,
              message: "Username must be atleast 4 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username can not exceed 20 characters",
            },
          })}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username?.message}</p>
        )}
      </div>
      <div className={styles.inputCont}>
        <label className={styles.label} htmlFor="">
          email
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          type="email"
          placeholder="enter an email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email?.message}</p>
        )}
      </div>
      <div className={styles.inputCont}>
        <label className={styles.label} htmlFor="">
          password
        </label>
        <input
          className={`${styles.input} ${styles.title}`}
          type="password"
          placeholder="enter a password"
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
      <div>
        <p className={styles.signinLink}>
          Already have an account?{" "}
          <span>
            <Link to="/signin" className={styles.link}>
              Sign in
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}
