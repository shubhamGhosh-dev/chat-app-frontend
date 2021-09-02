import React from 'react';
import ReactDOM from "react-dom";


const Modal = ({ children, isOpen, setIsOpen }) => {

    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal__wrapper">
            <div className="modal__content">
                <button className="modal__close-btn" onClick={() => setIsOpen(false)}>
                    <i className="fas fa-2x fa-times-circle"></i>
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default Modal;
