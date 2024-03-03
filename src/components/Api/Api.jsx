import axios from 'axios';

const apiKey = '6V-3GZ59GwW9BVTbyMeERWIU1-FRqCKmUEvLShWiSVg';

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        page: page,
        per_page: '16',
        client_id: apiKey // Using apiKey variable
      }
    });
    const newImages = response.data.results.map(image => ({
      id: image.id,
      webformatURL: image.urls.small, // Adjusted to use the appropriate property
      largeImageURL: image.urls.full, // Adjusted to use the appropriate property
      alt: image.alt_description // Adjusted to use the appropriate property
    }));
    return newImages;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export { fetchImages };
