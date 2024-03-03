import axios from 'axios';

const apiKey = '6V-3GZ59GwW9BVTbyMeERWIU1-FRqCKmUEvLShWiSVg';

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        page: page,
        per_page: '12',
        client_id: apiKey 
      }
    });
    const newImages = response.data.results.map(image => ({
      id: image.id,
      webformatURL: image.urls.small,
      largeImageURL: image.urls.full, 
      alt: image.alt_description 
    }));
    return newImages;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export { fetchImages };
