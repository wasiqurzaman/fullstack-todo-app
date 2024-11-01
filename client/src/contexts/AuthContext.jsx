import { createContext, useContext, useEffect, useState } from "react";
import { signUp, signIn, signOut, refreshToken } from "../services/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  async function signup(userDetails) {
    try {
      const data = await signUp(userDetails);
      console.log(data);
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (err) {
      console.log("User signup failed", err);
    }
  }

  async function signin(signinDetails) {
    try {
      const res = await signIn(signinDetails);
      console.log(res);
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      return res;
    } catch (err) {
      console.log("Signin failed", err);
    }
  }

  async function signout() {
    setAccessToken(null);
    setUser(null);
    const data = await signOut();
    return data;
  }

  async function refreshAccessToken() {
    try {
      const res = await refreshToken();
      setAccessToken(res.data.accessToken);
      console.log("token refreshed");
      console.log(res.data);
    } catch (err) {
      console.log("Failed to refresh the access token", err);
    }
  }

  useEffect(() => {
    // if (!user) return;
    refreshAccessToken();
    const interval = setInterval(refreshAccessToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, user, signup, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext is used outside of the AuthProvider");
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
