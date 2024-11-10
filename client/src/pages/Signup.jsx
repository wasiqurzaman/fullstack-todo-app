import { useNavigate } from "react-router-dom";
import SignForm from "../components/SignupForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

import styles from "./SignUp.module.css";

export default function SignUp() {
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
            src="images/Sign-up-bro.png"
            alt="sign up illustration"
            className={styles.image}
          />
        </div>
        <div className={styles.formContainer}>
          <SignForm />
        </div>
      </div>
    </div>
  );
}
