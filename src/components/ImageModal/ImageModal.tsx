import css from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement("#root");

export default function ImageModal({ isModalOpen, closeModal, modalImage, altDescription }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div>
        <img className={css.modalImg} src={modalImage} alt={altDescription} />
        <p className={css.modalText}>{altDescription}</p>
      </div>
    </Modal>
  );
};
