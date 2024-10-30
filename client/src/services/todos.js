import axios from "axios";
const baseUrl = "http://localhost:3000/api/todos";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const config = {
  headers: { "Authorization": token }
}

export const getAllTasks = async () => {
  console.log(token)
  const res = await axios.get(baseUrl, config);

  console.log(res.data);
}

export const createTask = async (newTask) => {
  const res = await axios.post(baseUrl, newTask, config);
  return res.data;
}

export const updateTask = async (id, updatedTask) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedTask, config);
  return res.data;
}

export const deleteTask = async (id) => {
  const res = await axios.put(`${baseUrl}/${id}`, config);
  return res.data;
}
