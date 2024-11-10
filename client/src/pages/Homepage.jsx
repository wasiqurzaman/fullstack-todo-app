import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <img
            src="images/Checklist-pana.png"
            alt="todo list illustration"
            className={styles.image}
          />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.titleCont}>
            <h1 className={styles.h1}>Todo App</h1>
            <p className={styles.p}>
              Organize your task and goals. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Iusto perferendis quas autem nemo
              repellat et obcaecati!
            </p>
            <Link to="/signup" className={styles.btn}>
              Get Started
            </Link>
          </div>
          <p className={`${styles.p} ${styles.pLink}`}>
            Already have an account?{" "}
            <Link to="/signin" className={`${styles.p} ${styles.pLink}`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
