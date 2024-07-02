import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectToken } from "../../redux/auth/selectors";
///*
const PrivateRoute = ({
  component: Component,
  navigateTo = "/login",
  ...routeProps
}) => {
  console.log("PrivateRoute :>> ", PrivateRoute);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  if (!isLoggedIn && token) {
    return <p>loading...</p>;
  }
  if (!isLoggedIn && !token) {
    return <Navigate to={navigateTo} />;
  }

  return <Component {...routeProps} />;
  // return isLoggedIn ? <Component {...routeProps} /> : <Navigate to="/login" />;
};
//*/
/*
import { selectAuth } from "../../redux/auth/selectors";
import { Outlet } from "react-router-dom";
const PrivateRoute = () => {
  console.log("selectAuth :>> ", selectAuth);
  const { isLoggedIn, token } = useSelector(selectAuth);
  console.log("selectAuth :>> ", selectAuth);
  console.log("isLoggedIn :>> ", isLoggedIn);
  console.log("token :>> ", token);
  if (!isLoggedIn && token) {
    return <p>loading...</p>;
  }
  if (!isLoggedIn && !token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
*/
export default PrivateRoute;
