import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContact } from "../../redux/contacts/operations";

import { FaAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
// import { FaBolt } from "react-icons/fa";
// import toast from "react-hot-toast";

import css from "./Contact.module.css";

const Contact = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, number } = data;

  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    navigate(`/contact/${id}`);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteContact(id));
    closeModal();
  };

  return (
    <>
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
        </div>
        <div className={css["container-btn"]}>
          <button className={css.btn} onClick={() => handleEdit(data)}>
            Edit
          </button>
          <button className={css.btn} onClick={openModal}>
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <div className={css.modal}>
          <p>Are you sure you want to delete this contact?</p>
          <div>
            <button className={css.modalButton} onClick={handleDelete}>
              Yes
            </button>
            <button className={css.modalButton} onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
