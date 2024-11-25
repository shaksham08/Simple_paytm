import { useState } from "react";
import { BottomWarning } from "../../Components/BottomWarning";
import { Button } from "../../Components/Button";
import { Heading } from "../../Components/Header";
import { InputBox } from "../../Components/InputBox";
import { SubHeading } from "../../Components/SubHeading";
import axios from "axios";

export const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const updateState = (key, value) => {
    setSignUpData({ ...signUpData, [key]: value });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3011/api/v1/user/signup", signUpData)
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
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => updateState("firstName", e.target.value)}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => updateState("lastName", e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => updateState("userName", e.target.value)}
            placeholder="userName"
            label={"UserName"}
          />
          <InputBox
            onChange={(e) => updateState("password", e.target.value)}
            placeholder="123456"
            label={"Password"}
            type="password"
          />
          <div className="pt-4">
            <Button onClick={onSubmit} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
