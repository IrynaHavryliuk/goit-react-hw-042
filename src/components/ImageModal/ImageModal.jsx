
import Modal from 'react-modal';

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          background: 'none',
          overflow: 'hidden'
        }
      }}
    >
      <button onClick={onClose}>Close</button>
      <img src={imageUrl} alt="Large" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </Modal>
  );
};

export default ImageModal;
