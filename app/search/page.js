'use client'

import { useState } from "react"

const API_KEY = process.env.API_KEY

export default function Search(){

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading ] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }
  const handleSearch = () => {
    // 검색어가 입력되었을 때만 검색 실행
    if (searchTerm) {
      setLoading(true)
      getMovies(
        `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&language=ko&®ion=KR&query=${searchTerm}`
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="search">
        <input 
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder = "Enter the movie title to search"/>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search!
        </button>
      </div>
      <div className="search-list">
        {
          movies.length == 0 && !loading && (
            <h2 className="empty-message">
              Search for the movie title!
            </h2>
          )
        }
        {
          loading && (
            <div className="the-loader"></div>
          )
        }
        <div className="movies">
          {
            movies?.map((movie)=>(
              <div key={movie.id}>
                <div className="movie" key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                  <div className="info">
                    <div className="date">{movie.release_date}</div>
                    <div className="title">{movie.title}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        </div>
    </div>

  )
}