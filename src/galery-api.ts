import axios from "axios"
import {FetchDataResponse } from "./components/App/App.types";
const API_KEY = 'VkUWbsWq3VFPUHkdL5DsgvjH97pXb2HjRqkgodefDL4'

axios.defaults.baseURL = 'https://api.unsplash.com/';
export const fetchImages = async (
  query: string,
  currentPage: number
): Promise<FetchDataResponse> => {
  const response = await axios.get<FetchDataResponse>("/search/photos", {
    params: {
      client_id: API_KEY,
      query: query,
      page: currentPage,
      per_page: 12,
    },
  });
  return response.data;
};