import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { deleteContact } from "../../redux/contactsSlice";
import { deleteContact } from "../../redux/contacts/operations";

import { FaAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { format } from "date-fns";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

import css from "./Contact.module.css";
import { useState } from "react";
// import ContactForm from "../ContactForm/ContactForm";
// import { useState } from "react";

const Contact = ({ data }) => {
  const dispatch = useDispatch();
  console.log("Contact.data :>> ", data);

  // const [editData, setEditData] = useState(null);
  const { id, name, number, dateTimeStamp } = data;
  let date = "";
  if (dateTimeStamp) {
    date = format(new Date(dateTimeStamp), "yyyy-MM-dd HH:mm:ss");
  }

  const navigate = useNavigate();
  const handleEdit = (contact) => {
    console.log("handleEdit.contact :>> ", contact);
    console.log("handleEdit.contact.id :>> ", contact.id);
    navigate(`/contact/${id}`);
    // setEditData(contact);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const handleDelete = (contact) => {
    dispatch(deleteContact(contact.id));
    toast.success("Contact deleted successfully");
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    console.log("confirmDelete :>> ", contactToDelete);
    await dispatch(deleteContact(contactToDelete.id));
    toast.success("Contact deleted successfully");
    setIsModalOpen(false);
  };

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
        <div className={css["container-btn"]}>
          <button className={css.btn} onClick={() => handleEdit(data)}>
            Edit
            {/* <Link to={`/contact/${id}`}>Edit</Link> */}
          </button>
          {/* <button
            className={css.btn}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button> */}
          <button className={css.btn} onClick={() => handleDelete(data)}>
            Delete
          </button>
        </div>
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
          message={`Are you sure you want to delete ${contactToDelete?.name}?`}
        />
      </div>
    </li>
  );
};

export default Contact;
