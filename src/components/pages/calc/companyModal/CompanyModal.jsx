// CompanyModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './CompanyModal.scss'; // Import your custom styles here

const CompanyModal = ({ isOpen, onClose }) => {
    const company = useSelector((state) => state.calcData.modal.company);
    const [isClosing, setIsClosing] = useState(false);


    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 200);
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Company Modal"
            className={`modal-content ${isClosing ? 'modal-closing' : 'modal-opening'}`} // Apply your custom class here
            overlayClassName="modal-overlay" // Apply your custom class here
        >
            <div className="close-button">
                <button onClick={handleClose}>Close Modal</button>
            </div>
            {/* Your company details go here */}
            <h2>{company.name}</h2>
            {/* Add more details as needed */}
        </Modal>
    );
};

export default CompanyModal;
