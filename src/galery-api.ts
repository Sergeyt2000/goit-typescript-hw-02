import axios from "axios"
const API_KEY = 'VkUWbsWq3VFPUHkdL5DsgvjH97pXb2HjRqkgodefDL4'

axios.defaults.baseURL = 'https://api.unsplash.com/';
export const fetchImages = async (query, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: API_KEY,
      query: query,
      page: currentPage,
      per_page: 12,
    },
  });
  return response.data;
};