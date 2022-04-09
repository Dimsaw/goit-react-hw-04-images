import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return <img src={webformatURL} alt={tags} onClick={onClick} />;
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
