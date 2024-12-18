import TaskForm from "./TaskForm";
import styles from "./AddTask.module.css";
import { motion, AnimatePresence } from "framer-motion";
import useTodo from "../contexts/TodoContext";

export default function AddTasks() {
  const { isAdding, setIsAdding } = useTodo();
  return (
    <AnimatePresence>
      {isAdding && (
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
            <TaskForm mode="create" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
