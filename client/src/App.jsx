import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SignIn";
import Main from "./pages/Main";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        {/* <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Link to="/">Home</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SingIn />} />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
