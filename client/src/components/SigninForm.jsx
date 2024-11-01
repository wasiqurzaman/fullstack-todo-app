import { useForm } from "react-hook-form";
import styles from "../styles/SigninForm.module.css";
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
    const res = await signin(data);
    console.log(res);
    navigate("/");
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
