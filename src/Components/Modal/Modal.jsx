import React from 'react';
import styles from '../Modal/Modal.module.css';

function Modal({onClose, children}) {

    return (
        <div className={styles.overlay} onClick={onClose} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )

}

export default Modal;