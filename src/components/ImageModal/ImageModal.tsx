import css from './ImageModal.module.css';
import Modal from 'react-modal';
import { ImageModalProps } from './ImageModal.types';

Modal.setAppElement("#root");

export default function ImageModal({ isModalOpen, closeModal, modalImage, altDescription }: ImageModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.modalContent}>
        <img className={css.modalImg} src={modalImage} alt={altDescription} />
        <p className={css.modalText}>{altDescription}</p>
      </div>
    </Modal>
  );
};
