import React, { useState } from "react";
import Input from "./input";
import Button from "./Button";
import { BE_signup, BE_signin } from "../Backend/Queries";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { authDataType } from "../Types";

// Trang đăng ký đăng nhập
const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSignup = () => {
    const data = { email, password, confirmPassword };
    //BE_signup(data, setSignUpLoading, reset, goTo, dispatch);
    auth(data, BE_signup, setSignUpLoading);
  };

  const handleSignin = () => {
    const data = { email, password };
    //BE_signin(data, setSignInLoading, reset, goTo, dispatch);
    auth(data, BE_signin, setSignInLoading);
  };
  const reset = () => {
    setEmail("");
    setConfirmPassword("");
    setPassword("");
  };
  const auth = (
    data: authDataType,
    func: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    func(data, setLoading, reset, goTo, dispatch);
  };
  return (
    <div className="w-full  md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10 ">
        {/* Đúng thì là trang login sai thì thành trang đăng ký */}
        {login ? "Login" : "Register"}
      </h1>

      <div className=" flex flex-col bg-white p-6 min-h-[150px] gap-3 w-full rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          // cập nhật lại giá trị email sau sự kiện onChange
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* thanh xác nhận khi đăng ký tài khoản mới  */}
        {!login && (
          <Input
            name="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {login ? (
          <>
            <Button
              text="Login"
              onClick={() => handleSignin()}
              loading={signInLoading}
            />
            <Button onClick={() => setLogin(false)} text="Register" secondary />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={() => handleSignup()}
              loading={signUpLoading}
            />
            <Button secondary onClick={() => setLogin(true)} text="Login" />
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
