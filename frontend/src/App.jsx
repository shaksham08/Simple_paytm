import { Routes, Route } from "react-router-dom";
import { Signup } from "./Pages/Signup/Signup";
import { Signin } from "./Pages/SignIn/SignIn";
import { SendMoney } from "./Pages/SendMoney/SendMoney";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
  );
}

export default App;
