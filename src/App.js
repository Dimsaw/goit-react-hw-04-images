import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import fetchImages from './API-services';
import Button from './components/Button';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchPictures, setSearchPictures] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchPictures || !page) {
      return;
    }
    setStatus(Status.PENDING);

    fetchImages(searchPictures, page)
      .then(images => {
        setImages(state => [...state, ...images.hits]);
        setStatus(Status.RESOLVED);
        setLoading(true);
        handleScroll();

        const endPage = images.totalHits / images.hits.length;
        if (images.hits.length === 0) {
          setLoading(false);
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        }

        if (
          page === endPage ||
          (images.hits.length < 12 && images.hits.length >= 1)
        ) {
          setLoading(false);
          toast.error(
            `We're sorry, but you've reached the end of search results.`,
          );
        }
      })

      .catch(error => setMessage({ message: 'ERROR' }));
  }, [searchPictures, page]);

  const increment = () => {
    setPage(state => state + 1);
  };

  const handelFormSubmit = searchPictures => {
    setSearchPictures(searchPictures);
    setImages([]);
    setPage(1);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = (url, tags) => {
    setUrl(url);
    setTags(tags);
    toggleModal();
  };

  return (
    <>
      <Searchbar onSubmit={handelFormSubmit} />
      {status === 'idle' && <p className={s.header}>Enter name.</p>}

      {status === 'pending' && <Oval color="#00BFFF" height={80} width={80} />}

      {status === 'rejected' && <div>{message}</div>}

      <ImageGallery images={images} tags={tags} onClick={handleClick} />

      {loading && <Button increment={increment} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img className="imageLarge" alt={tags} src={url} />
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
