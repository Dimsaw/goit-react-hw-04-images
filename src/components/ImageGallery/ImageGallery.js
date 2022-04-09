// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} className={s.item}>
          <ImageGalleryItem
            onClick={() => onClick(largeImageURL)}
            webformatURL={webformatURL}
            alt={tags}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};
