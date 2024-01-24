import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const MessagePopup = ({ message, show, onClose }) => {
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    setShowToast(show);
  }, [show]);

  const handleClose = () => {
    setShowToast(false);
    onClose();
  };

  return (
    <Toast
      show={showToast}
      onClose={handleClose}
      delay={3000}
      autohide
      style={{
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default MessagePopup;
