import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import HomePage from "@/pages/home/home";
import LoginPage from "@/pages/login/login";
import SignUpPage from "@/pages/signup/signup";
import { useAuthContext } from "@/context/auth-context";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="h-screen w-full items-center flex justify-center">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
