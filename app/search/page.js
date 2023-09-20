'use client'

import Link from "next/link";
import { useState } from "react";
import { searchApi } from "@/pages/api/movies";


export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // 검색어가 입력되었을 때만 검색 실행
    if (searchTerm) {
      setLoading(true);
      searchApi(searchTerm)
        .then((results) => {
          setMovies(results);
          console.log(results);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        })
        .finally(() => {
          setLoading(false);
        });
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter the movie title to search"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search!
        </button>
      </div>
      <div className="search-list">
        {movies.length === 0 && !loading && (
          <h2 className="empty-message">Search for the movie title!</h2>
        )}
        {loading && <div className="the-loader"></div>}
        <div className="movies">
          {movies?.map((movie) => (
            <Link 
              href={`movie-detail/${movie.id}`} 
              key={movie.id}>
              <div 
                key={movie.id} 
                className="movie"
                onClick={() => handleMovieClick(movie)}
                >
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className="info">
                  <div className="date">{movie.release_date}</div>
                  <div className="title">{movie.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}