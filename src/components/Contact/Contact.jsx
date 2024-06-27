import { useDispatch } from "react-redux";
//import { deleteContact } from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/contactsOps";

import { FaAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { format } from "date-fns";

import css from "./Contact.module.css";

const Contact = ({ data }) => {
  const dispatch = useDispatch();
  const { id, name, number, dateTimeStamp } = data;
  let date = "";
  if (dateTimeStamp) {
    date = format(new Date(dateTimeStamp), "yyyy-MM-dd HH:mm:ss");
  }
  return (
    <li key={id} className={css["contact-item"]}>
      <div className={css.container}>
        <div>
          <p className={css.id}>
            <span className={css.icon}>
              <FaAddressCard />
            </span>
            {id}
          </p>
          <p className={css.text}>
            <span className={css.icon}>
              <FaUser />
            </span>
            {name}
          </p>
          <p className={css.text}>
            <span className={css.icon}>
              <FaPhoneAlt />
            </span>
            {number}
          </p>
          {dateTimeStamp && (
            <p className={css.text}>
              <span className={css.icon}>
                <FaBolt />
              </span>
              {date}
            </p>
          )}
        </div>
        <button className={css.btn} onClick={() => dispatch(deleteContact(id))}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;
