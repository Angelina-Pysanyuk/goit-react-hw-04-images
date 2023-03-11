import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ picture }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { webformatURL, largeImageURL, tags } = picture;

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal onCloseModal={onCloseModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};

export default ImageGalleryItem;
