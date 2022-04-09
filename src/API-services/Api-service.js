const axios = require('axios').default;

const API_KEY = '24793371-9eea329880a97afb5c057777f';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(name, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&page=${page}&per_page=12`;
  const images = await axios.get(url);
  const result = images.data;
  return result;
}

export default fetchImages;
