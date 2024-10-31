import axios from "axios";
const baseUrl = "http://localhost:3000/api/auth"

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

export const signUp = async (userDetails) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.post(`${baseUrl}/signup`, userDetails, config);
  return res.data;
}

export const SignIn = async (userDetails) => {
  const config = {
    headers: { "Authorization": token }
  }
  const res = await axios.post(`${baseUrl}/login`, userDetails, config);
  return res.data;

}

export const SignOut = async () => {
  const res = await axios.get(`${baseUrl}/logout`);
  return res.data;
}