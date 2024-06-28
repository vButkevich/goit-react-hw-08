import { useSelector } from "react-redux";
import {
  selectContacts,
  // selectContactsCount,
} from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";

import css from "./Contactlist.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  // const contactItems = useSelector(selectContactsCount);

  return (
    <div name="contact-list" className={css["contact-list"]}>
      <ul className={css["contact-list"]}>
        {contacts?.map((item) => (
          <Contact key={item.id} data={item} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
