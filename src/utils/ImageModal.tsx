// ImageModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Imagen en Grande"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content mt-24">
        <img src={imageUrl} alt="Imagen en Grande" className="modal-image" />
        <button onClick={onRequestClose} className="modal-close-btn">Cerrar</button>
      </div>
    </Modal>
  );
};

export default ImageModal;
