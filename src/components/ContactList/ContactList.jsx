import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";

import css from "./Contactlist.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);

  return (
    <>
      <div name="contact-list" className={css["contact-list"]}>
        <ul className={css["contact-list"]}>
          {contacts?.map((contact) => (
            <li key={contact.id} className={css["contact-item"]}>
              <Contact key={contact.id} data={contact} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
