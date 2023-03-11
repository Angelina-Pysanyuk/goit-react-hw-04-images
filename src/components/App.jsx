import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../api/api';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;

    async function findImages() {
      try {
        const { hits, totalHits } = await fetchImages(query, page);

        const loadedPictures = hits.reduce(
          (acc, { id, webformatURL, largeImageURL, tags }) => {
            acc.push({ id, webformatURL, largeImageURL, tags });
            return acc;
          },
          []
        );

        if (loadedPictures.length === 0) {
          throw new Error('Sorry, there are no images with such name');
        }

        if (page === 1) {
          toast[`success`](`${totalHits} images found`);
        }

        setPictures(prevPictures => [...prevPictures, ...loadedPictures]);

        if (page >= Math.ceil(totalHits / 12)) {
          return setShowButton(false);
        }

        setShowButton(true);
      } catch (error) {
        toast['error'](error.message);
      } finally {
        setLoading(false);
      }
    }

    findImages();
  }, [query, page]);

  const onSearchSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      return toast['error']('Please, type something to find images');
    }

    setQuery(searchQuery);
    setPage(1);
    setPictures([]);
    setShowButton(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
        fontSize: 16,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={onSearchSubmit} />
      {pictures.length !== 0 && <ImageGallery pictures={pictures} />}
      {showButton && <Button onClick={onLoadMore}>Load more</Button>}
      {loading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
