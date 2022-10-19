import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '21771663-2e6d452ebbeefce836ab6f875';

export const fetchApi = async (query = '', page = 1) => {
  const { data } = await axios.get(
    `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
