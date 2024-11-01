import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SigninForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import styles from "./SignIn.module.css";

export default function SignIn() {
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
        <SignInForm />
      </div>
    </div>
  );
}
