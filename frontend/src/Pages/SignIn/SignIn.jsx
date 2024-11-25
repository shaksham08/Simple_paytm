import axios from "axios";
import { BottomWarning } from "../../Components/BottomWarning";
import { Button } from "../../Components/Button";
import { Heading } from "../../Components/Header";
import { InputBox } from "../../Components/InputBox";
import { SubHeading } from "../../Components/SubHeading";
import { useState } from "react";

export const Signin = () => {
  const [signInData, setSignInData] = useState({
    userName: "",
    password: "",
  });

  const updateFormValues = (key, value) => {
    setSignInData({ ...signInData, [key]: value });
  };

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:3011/api/v1/user/signin", signInData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        alert("Error: " + err.response.data.message);
      });
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => updateFormValues("userName", e.target.value)}
            placeholder="userName"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => updateFormValues("password", e.target.value)}
            placeholder="123456"
            label={"Password"}
            type="password"
          />
          <div className="pt-4">
            <Button onClick={handleFormSubmit} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
