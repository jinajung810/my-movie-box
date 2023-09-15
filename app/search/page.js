'use client'

import { useState } from "react"

const API_KEY = "7d229ca04fa6f47f9241e1865a6ab0be"

export default function Search(){

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }
  const handleSearch = () => {
    // 검색어가 입력되었을 때만 검색 실행
    if (searchTerm) {
      getMovies(
        `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&language=ko&page=1®ion=KR&query=${searchTerm}`
      );
      setSearchTerm("");
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSearch(); 
    }
  }
  const getMovies = async (url) => {
    try {
      const { results } = await (
        await fetch(url)
      ).json();
      console.log(results)
      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  console.log(movies)

  return (
    <div className="search">
      <input 
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder = "Enter the movie title to search"/>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search!
      </button>
      <div className="movie-container">
         {movies.map((movie) => (
           <div key={movie.id}>
             <h2>{movie.title}</h2>
           </div>
        ))}
       </div>
    </div>
  )
}