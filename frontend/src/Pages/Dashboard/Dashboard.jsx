import { AppBar } from "../../Components/AppBar";
import { Balance } from "../../Components/Balance";
import { Users } from "../../Components/Users";

export const Dashboard = () => {
  const userToken = localStorage.getItem("token");
  return (
    <div>
      <AppBar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};
