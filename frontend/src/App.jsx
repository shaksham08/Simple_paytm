import { Routes, Route } from "react-router-dom";
import { Signup } from "./Pages/Signup/Signup";
import { Signin } from "./Pages/SignIn/SignIn";
import { SendMoney } from "./Pages/SendMoney/SendMoney";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
  );
}

export default App;
