import axios from "axios";
const baseUrl = "http://localhost:3000/api/todos";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

export const getAllTasks = async () => {
  const config = {
    headers: { "Authorization": token }
  }
  return await axios.get(baseUrl, config);
}

export const createTask = async (newTask) => {
  const config = {
    headers: { "Authorization": token }
  }
  return await axios.post(baseUrl, newTask, config);
}

export const updateTask = async (id, updatedTask) => {
  const config = {
    headers: { "Authorization": token }
  }
  return await axios.put(`${baseUrl}/${id}`, updatedTask, config);
}

export const deleteTask = async (id) => {
  const config = {
    headers: { "Authorization": token }
  }
  return await axios.delete(`${baseUrl}/${id}`, config);
}
