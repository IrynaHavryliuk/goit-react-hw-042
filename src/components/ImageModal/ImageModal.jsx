import { useEffect } from 'react';
import css from './ImageModal.module.css';

const ImageModal = ({ toggleModal, imgURL }) => {
  useEffect(() => {
    const handleClickEsc = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleClickEsc);
    return () => {
      document.removeEventListener('keydown', handleClickEsc);
    };
  }, [toggleModal]);

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlay}>
      <div className={css.modal}>
        <img src={imgURL} alt="" />
      </div>
    </div>
  );
};

export default ImageModal;
