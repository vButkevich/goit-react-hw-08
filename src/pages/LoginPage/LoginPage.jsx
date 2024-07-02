import { useDispatch } from "react-redux";
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm.jsx";
import { login } from "../../redux/auth/operations.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const submitHandle = (values) => {
    dispatch(login(values));
  };
  return (
    <div name="login-page">
      <h1 className="title">Login</h1>
      <div className="form">
        <AuthorizationForm mode="login" submit={submitHandle} />
      </div>
    </div>
  );
};

export default LoginPage;
