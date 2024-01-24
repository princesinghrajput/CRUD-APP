import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = ({ show, handleClose, handleDelete }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDeleteClick = () => {
    // Perform the deletion logic here

    // Assuming handleDelete is an asynchronous function, you can use promises or async/await
    handleDelete().then(() => {
      setShowSuccessMessage(true);

      // You can close the modal after a delay or perform any other actions
      setTimeout(() => {
        handleClose();
        setShowSuccessMessage(false);
      }, 2000); // Adjust the delay as needed
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccessMessage ? (
          <p>Deleted successfully!</p>
        ) : (
          <p>Are you sure you want to delete this user?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!showSuccessMessage && (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              Delete
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
