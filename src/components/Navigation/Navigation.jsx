import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        {/* <NavLink to="/contacts">Contacts</NavLink> */}
        {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
      </nav>
    </>
  );
};

export default Navigation;
