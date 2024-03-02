import { useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal'; // Import ImageModal component
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [searchTopic, setSearchTopic] = useState('');
  const [page, setPage] = useState(1);
  const [imgModal, setImgModal] = useState('');

  const fetchImagesWithTopic = async (topic, pageNum) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: topic,
        page: pageNum,
        per_page: '16',
        client_id: '6V-3GZ59GwW9BVTbyMeERWIU1-FRqCKmUEvLShWiSVg' // Replace with your actual Unsplash access key
      }
    });
    return response.data.results;
  };

  const handleSearch = async (topic) => {
    try {
      setSearchTopic(topic);
      setArticles([]); // Clear previous search results
      setError(false);
      setLoading(true);
      const data = await fetchImagesWithTopic(topic, 1); // Fetch the first page of results
      setArticles(data);
      setPage(1); // Reset page to 1 for new search
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => setModalIsOpen(prev => !prev);
  
  const handleModal = img => {
    setImgModal(img);
    setModalIsOpen(true);
  };

  const loadMoreImages = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchImagesWithTopic(searchTopic, nextPage);
      setArticles([...articles, ...data]); // Append new results to existing ones
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Whoops, something went wrong! Please try again later.</p>}
      <ImageGallery images={articles} openModal={handleModal} />
      {modalIsOpen && <ImageModal imgURL={imgModal} toggleModal={toggleModal} />}
      {articles.length > 0 && <LoadMoreBtn onClick={loadMoreImages} />}
    </div>
  );
};

export default App;
