// api.js

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;
const LANGUAGE = 'ko-KR';

export const searchApi = async (query) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Movie data not found');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const detailApi = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Movie data not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
