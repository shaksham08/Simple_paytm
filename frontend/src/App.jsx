import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import Signup from "./Pages/Signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/send" element={<h1>Send</h1>} />
    </Routes>
  );
}

export default App;
