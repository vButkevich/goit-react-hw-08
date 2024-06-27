// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/operations";
import { selectUser } from "../redux/auth/selectors";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
