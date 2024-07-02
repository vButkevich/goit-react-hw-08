// import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

import { FaAddressBook } from "react-icons/fa";
import { selectContactsCount } from "../../redux/contacts/selectors.js";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const contactsCount = useSelector(selectContactsCount);
  const color = "gray";

  return (
    <header>
      <h1>
        <span>
          <FaAddressBook color={color} />
        </span>
        Contact Book
        {isLoggedIn ? contactsCount > 0 && <sub>[{contactsCount}]</sub> : ""}
      </h1>

      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
