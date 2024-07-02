import { useDispatch, useSelector } from "react-redux";
import { resetContacts } from "../../redux/contacts/slice";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogOut = async () => {
    await dispatch(resetContacts());
    await dispatch(logout());
  };

  return (
    <div className={css.logout}>
      <p>
        Welcome, <span className={css["user-name"]}>{user.name}</span>
      </p>
      <p className={css["user-email"]}>
        <span>{user.email}</span>
      </p>
      <button type="button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
