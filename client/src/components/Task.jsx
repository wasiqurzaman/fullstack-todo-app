import styles from "./Task.module.css";
import { FaAngleRight } from "react-icons/fa6";

export default function Task({ task }) {
  return (
    <li className={styles.task}>
      <input type="checkbox" className={styles.checkbox} />
      <div>
        <p className={styles.title}> {task?.title}</p>
      </div>
      <button className={styles.detailsBtn}>
        <FaAngleRight size="24" />
      </button>
    </li>
  );
}
