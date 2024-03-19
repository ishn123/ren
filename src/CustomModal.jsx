import React from 'react';
import Modal from 'react-modal';

const overlayStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
};

const sidebarStyles = {
  content: {
    top: 0,
    right: 0,
    position: 'fixed',
    width: '300px',
    height: '100%',
    backgroundColor: 'white',
    border: 'none',
    padding: '20px',
    overflowY: 'auto',
    margin: 0,
    marginLeft: 'auto', // Add this property
  },
};

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Sidebar Modal"
      style={{ ...overlayStyles, ...sidebarStyles }}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
