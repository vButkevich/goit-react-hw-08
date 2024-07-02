import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
///*
const RestrictedRoute = ({
  component: Component,
  navigateTo = "/",
  ...routeProps
}) => {
  console.log("RestrictedRoute :>> ", Component);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? (
    <Navigate to={navigateTo} />
  ) : (
    <Component {...routeProps} />
  );
};
//*/
/*
import { Outlet } from "react-router-dom";
import { selectAuth } from "../../redux/auth/selectors";
const RestrictedRoute = () => {
  console.log("selectAuth :>> ", selectAuth);
  const { isLoggedIn, token } = useSelector(selectAuth);
  console.log("selectAuth :>> ", selectAuth);
  console.log("isLoggedIn :>> ", isLoggedIn);
  console.log("token :>> ", token);
  if (!isLoggedIn && token) {
    return <p>loading...</p>;
  }
  if (!isLoggedIn && !token) {
    return <Navigate to="/contacts" />;
  }
  return <Outlet />;
};
*/
export default RestrictedRoute;
