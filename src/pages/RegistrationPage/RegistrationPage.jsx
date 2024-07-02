import { useDispatch } from "react-redux";
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm.jsx";
import { register } from "../../redux/auth/operations.js";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const submitHandle = (values) => {
    dispatch(register(values));
  };
  return (
    <div name="registration-page">
      <h1 className="title">Register</h1>
      <div className="form">
        <AuthorizationForm mode="registration" submit={submitHandle} />
      </div>
    </div>
  );
};

export default RegistrationPage;
