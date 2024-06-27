// import React from "react";
import Contacts from "../components/ContactList/ContactList";
import {
  selectContactsCount,
  // selectIsLoading,
  // selectHasError,
} from "./../redux/contacts/selectors";
// import ContactList from "../components/ContactList/ContactList";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactFilter from "../components/SearchBox/SearchBox";
import { FaAddressBook } from "react-icons/fa";
import { useSelector } from "react-redux";

const ContactsPage = () => {
  const contactsCount = useSelector(selectContactsCount);
  const color = "gray";

  return (
    <div>
      <h1>
        <span>
          <FaAddressBook color={color} />
        </span>
        Contact Book
        {contactsCount > 0 && <sub>[{contactsCount}]</sub>}
      </h1>
      <ContactForm />
      <ContactFilter />
      <Contacts />
      {/* <ContactList /> */}
    </div>
  );
};

export default ContactsPage;
