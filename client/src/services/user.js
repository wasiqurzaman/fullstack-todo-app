import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

export const getUserDetails = async () => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.get(baseUrl, config);
  return res.data;
}

export const updateUser = async (id, updatedUser) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.put(`${baseUrl}/${id}`, updatedUser, config);
  return res.data;
}

export const deleteUser = async (id) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
}
