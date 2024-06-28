// import React from "react";
import { useDispatch } from "react-redux";
import AuthorizationForm from "../components/AuthorizationForm.jsx";
// import LoginForm from "../components/LoginForm.jsx";
import { login } from "../redux/auth/operations";

const LoginPage = () => {
  const dispatch = useDispatch();
  const submitHandle = (values) => {
    dispatch(login(values));
  };
  return (
    <div name="login-page" className="form">
      <h1>Login</h1>
      {/* <LoginForm /> */}
      <AuthorizationForm mode="login" submit={submitHandle} />
    </div>
  );
};

export default LoginPage;
// {email: "testRegister@gmail.com", password: "testRegister@gmail.com"}
/*
{
  "email": "testRegister@gmail.com",
  "password": "testRegister@gmail.com"
}
*/
