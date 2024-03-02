import style from './ImageCard.module.css'
const ImageCard = ({ imageUrl }) => {
    return (
      <div>
        <img className={style.img} src={imageUrl} alt="" />
      </div>
    );
  };
  
  export default ImageCard;