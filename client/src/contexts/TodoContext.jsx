import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getAllTasks,
  createTask,
  updateTask as updtTask,
  deleteTask as delTask,
  setToken,
} from "../services/todos";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const { accessToken } = useAuth();

  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      setToken(accessToken);
      const res = await getAllTasks();
      console.log(res);
      setTasks(res.data);
    } catch (err) {
      console.log("Failed to fetch tasks", err);
    }
  }

  async function addTask(newTask) {
    try {
      setToken(accessToken);
      const res = await createTask(newTask);
      setTasks(prevTasks => prevTasks.concat(res.data));
    } catch (err) {
      console.log("Error: failed to add task", err);
    }
  }

  async function updateTask(id, newTask) {
    try {
      setToken(accessToken);
      const res = await updtTask(id, newTask);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id !== id ? task : res.data))
      );
    } catch (err) {
      console.log("Errro: Failed to update task", err);
    }
  }

  async function deleteTask(id) {
    try {
      setToken(accessToken);
      await delTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      console.log("Error : can't delete task", err);
    }
  }

  useEffect(() => {
    if (!accessToken) return;
    console.log(accessToken);
    fetchTasks();
  }, [accessToken]);

  return (
    <TodoContext.Provider
      value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default function useTodo() {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("AuthContext is used outside of the AuthProvider");
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
