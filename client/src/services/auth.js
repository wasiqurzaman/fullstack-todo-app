import axios from "axios";
const baseUrl = "http://localhost:3000/api/auth";

axios.defaults.withCredentials = true;

export const signUp = async (userDetails) => {
  return await axios.post(`${baseUrl}/signup`, userDetails);
}

export const signIn = async (userDetails) => {
  return await axios.post(`${baseUrl}/signin`, userDetails, { withCredentials: true });
}

export const signOut = async () => {
  return await axios.get(`${baseUrl}/signout`);
}

export const refreshToken = async () => {
  return await axios.get(`${baseUrl}/refresh-token`, { withCredentials: true });
}