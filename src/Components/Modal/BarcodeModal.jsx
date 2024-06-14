import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Barcode from 'react-barcode';

const BarcodeModal = ({ show, handleClose, serialNumber }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Barcode</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {serialNumber && <Barcode value={serialNumber} />}
      </Modal.Body>
    </Modal>
  );
};

export default BarcodeModal;
