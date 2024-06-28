import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  console.log("(Component :>> ", Component);
  console.log("(routeProps :>> ", routeProps);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Component {...routeProps} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
