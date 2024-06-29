import { useNavigate } from "react-router-dom";
import Contacts from "../../components/ContactList/ContactList";
import ContactFilter from "../../components/SearchBox/SearchBox";
import { fetchContacts } from "../../redux/contacts/operations";
import css from "./ContactsPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ContactsPage = () => {
  const navigate = useNavigate();
  const handleAddContact = () => {
    // console.log("handleNewContact :>> ", handleAddContact);
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
      {/* <Link to="/contact">Add New Contact</Link> */}
      <ContactFilter />
      <Contacts />
    </div>
  );
};

export default ContactsPage;
