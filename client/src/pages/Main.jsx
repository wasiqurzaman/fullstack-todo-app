import Sidebar from "../components/Sidebar";
import styles from "./Main.module.css";
import AddTasks from "../components/AddTask";
import Tasks from "../components/Tasks";

export default function Main() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Tasks />
      <AddTasks />
    </div>
  );
}
