import TaskForm from "./TaskForm";
import styles from "./EditTask.module.css";
import useTodo from "../contexts/TodoContext";
import { AnimatePresence, motion } from "framer-motion";

export default function EditTasks() {
  const { currentTask, isEditing, setIsEditing } = useTodo();
  return (
    <AnimatePresence>
      {isEditing && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            }}
            className={styles.modalBackdrop}
            onClick={() => setIsAdding(isAdding => !isAdding)}
          ></motion.div>

          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                duration: 0.3,
              },
            }}
            className={styles.addTask}
          >
            <TaskForm mode="edit" task={currentTask} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
