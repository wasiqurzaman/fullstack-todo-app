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
  const res = await axios.get(baseUrl, config);
  return res.data;
}

export const createTask = async (newTask) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.post(baseUrl, newTask, config);
  return res.data;
}

export const updateTask = async (id, updatedTask) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.put(`${baseUrl}/${id}`, updatedTask, config);
  return res.data;
}

export const deleteTask = async (id) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
}
