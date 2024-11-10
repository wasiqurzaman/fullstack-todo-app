import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SigninForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import styles from "./SignIn.module.css";

export default function SignIn() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <img
            src="images/Login-pana.png"
            alt="sign in illustration"
            className={styles.image}
          />
        </div>
        <div className={styles.formContainer}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
