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
    <div name="login-page">
      <h1 className="title">Login</h1>
      {/* <LoginForm /> */}
      <div className="form">
        <AuthorizationForm mode="login" submit={submitHandle} />
      </div>
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
