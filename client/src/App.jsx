import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SignIn";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
