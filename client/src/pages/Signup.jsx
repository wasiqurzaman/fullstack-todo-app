import { useNavigate } from "react-router-dom";
import SignForm from "../components/SignupForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

import styles from "./SignUp.module.css";

export default function SignUp() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || accessToken) {
      navigate("/");
    }
  }, [user, accessToken, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.card}></div>
      <div className={styles.formContainer}>
        <SignForm />
      </div>
    </div>
  );
}
