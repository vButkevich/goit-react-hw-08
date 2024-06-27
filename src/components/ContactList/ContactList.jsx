import { useSelector } from "react-redux";
import {
  selectContacts,
  selectContactsCount,
} from "../../redux/contactsSlice";
import css from "./Contactlist.module.css";
import Contact from "../Contact/Contact";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const contactItems = useSelector(selectContactsCount);

  return (
    <>
      <p>
        <b>contacts:</b> ({contacts?.length}) of {contactItems}
      </p>
      <hr></hr>
      <ul className={css["contact-list"]}>
        {contacts?.map((item) => (
          <Contact key={item.id} data={item} />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
