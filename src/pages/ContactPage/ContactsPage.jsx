import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchContacts } from "../../redux/contacts/operations";
import Contacts from "../../components/ContactList/ContactList";
import ContactFilter from "../../components/SearchBox/SearchBox";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const navigate = useNavigate();
  const handleAddContact = () => {
    navigate("/contact");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div name="ContactPage" className={css["contact-page"]}>
      <button type="button" onClick={() => handleAddContact()}>
        Add New Contact
      </button>
      <ContactFilter />
      <Contacts />
    </div>
  );
};

export default ContactsPage;
