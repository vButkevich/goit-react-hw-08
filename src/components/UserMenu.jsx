// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/operations";
import { selectUser, selectAuth } from "../redux/auth/selectors";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  // console.log("UserMenu.auth :>> ", auth);
  // console.log("UserMenu.user :>> ", user);
  return (
    <div className={css.logout}>
      <p>
        Welcome, <span className={css["user-name"]}>{user.name}</span>
      </p>
      <p className={css["user-email"]}>
        <span>{user.email}</span>
      </p>
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
