// import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Action"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Confirm Action</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </Modal>
  );
};

export default ConfirmationModal;
