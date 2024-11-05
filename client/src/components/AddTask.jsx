import TaskForm from "./TaskForm";
import styles from "./AddTask.module.css";

export default function AddTasks() {
  return (
    <div className={styles.addTask}>
      <TaskForm mode="edit" />
    </div>
  );
}
