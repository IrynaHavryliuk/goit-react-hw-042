import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import styles from './App.module.css';
import { fetchImages as fetchImagesData } from './components/Api/Api';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [error, setError] = useState(false);


  const fetchData = useCallback(async () => {
    try {
      const newImages = await fetchImagesData(query, page);

      if (page === 1) {
        setImages(newImages);
      } else {
        setImages(prevImages => [
          ...prevImages,
          ...newImages.map(image => ({
            ...image,
            alt: image.tags || 'No description available',
          })),
        ]);
      }

      setHasMoreImages(newImages.length === 12);
    } finally {
      setLoading(false);
    }
  }, [query, page, setImages, setHasMoreImages, setLoading]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setLargeImageURL('');
    setShowModal(false);
    setHasMoreImages(true);
    fetchData();
    setLoading(true);
    setError(false);
  };

  const handleInitialLoad = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!hasMoreImages) {
      return;
    }

    setPage(prevPage => prevPage + 1);
    setLoading(true);
  }, [hasMoreImages]);

  const handleImageClick = url => {
    setLargeImageURL(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  useEffect(() => {
    const handleInitialLoadAsync = async () => {
      try {
        handleInitialLoad();
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    handleInitialLoadAsync();
  }, [handleInitialLoad]);

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSearch} />
      {error && <p>Whoops, something went wrong! Please try again later.</p>}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {hasMoreImages && <Button onClick={handleLoadMore}>Load more</Button>}
      {showModal && (
        <Modal onClose={handleCloseModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};

export default App;