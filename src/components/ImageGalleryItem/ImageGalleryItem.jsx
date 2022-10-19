import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  largeImageURL,
  previewURL,
  tags,
  openModal,
}) => {
  return (
    <li
      className={s.galleryItem}
      onClick={() => openModal(largeImageURL, tags)}
    >
      <img src={previewURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
