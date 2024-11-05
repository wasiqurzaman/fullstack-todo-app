import useTodo from "../contexts/TodoContext";
import Task from "./Task";
import styles from "./Tasks.module.css";
import { FaPlus } from "react-icons/fa6";

export default function Tasks() {
  const { tasks } = useTodo();

  console.log(tasks);

  return (
    <div className={styles.tasksGrid}>
      <div className={styles.tasksContainer}>
        <div className={styles.header}>
          <h2>Today</h2>
          <span>5</span>
        </div>
        <div className={styles.addNewBox}>
          <FaPlus />
          <span>Add New Task</span>
        </div>
        <div>
          <ul className={styles.taskList}>
            {tasks?.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </ul>
        </div>
        <div className={styles.filterBox}>
          <span>5 left</span>
          <div>
            <span>All</span>
            <span>Active</span>
            <span>Completed</span>
          </div>
          <button>Clear completed</button>
        </div>
      </div>
    </div>
  );
}
