import { useEffect, useState } from "react";
import { AppBar } from "../../Components/AppBar";
import { Balance } from "../../Components/Balance";
import { Users } from "../../Components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3011/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBalance(response.data.balance);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      <AppBar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};
