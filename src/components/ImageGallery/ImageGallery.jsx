import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css'

const ImageGallery = ({ images }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className={style.gallery}>
      {images.map(({ id, urls }) => (
        <li className={style.li} key={id}>
          <ImageCard imageUrl={urls.small} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
