
import axios from 'axios';


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';


const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
});


export const fetchGames = async (page = 1, filters = {}) => {
  try {
    const params = {
      page,
      page_size: 20, 
    };

    
    if (filters.category) params.genres = filters.category;
    if (filters.tags && filters.tags.length > 0) params.tags = filters.tags.join(',');
    if (filters.year) params.dates = `${filters.year}-01-01,${filters.year}-12-31`;
    if (filters.ordering) params.ordering = filters.ordering;
    if (filters.search) params.search = filters.search;

    const response = await apiClient.get('/games', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};


export const fetchGameDetails = async (gameId) => {
  try {
    const response = await apiClient.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};


export const fetchGameScreenshots = async (gameId) => {
  try {
    const response = await apiClient.get(`/games/${gameId}/screenshots`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    throw error;
  }
};


export const fetchGenres = async () => {
  try {
    const response = await apiClient.get('/genres');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};


export const fetchTags = async () => {
  try {
    const response = await apiClient.get('/tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};