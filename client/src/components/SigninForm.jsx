import { useForm } from "react-hook-form";
import styles from "./SigninForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { signin } = useAuth();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const res = await signin(data);
      console.log(res);
      if (!res.response) throw new Error("Failed to sign in");
      if (register.response.status === 401) throw new Error(res);
      navigate("/tasks");
    } catch (err) {
      console.log("Failed to sign in", err);
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.h2}>Sign in</h2>
      <div className={styles.inputCont}>
        <input
          className={`${styles.input} ${styles.title}`}
          type="text"
          placeholder="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username?.message}</p>
        )}
      </div>
      <div className={styles.inputCont}>
        <input
          className={`${styles.input} ${styles.title}`}
          type="password"
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password?.message}</p>
        )}
      </div>
      <button className={styles.btn} type="submit">
        Sign in
      </button>
      <div>
        <p className={styles.signinLink}>
          Don&apos;t have an account?{" "}
          <span>
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}
