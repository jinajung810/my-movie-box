'use client'

import { useEffect, useState } from 'react';
import { detailApi } from "@/pages/api/movies";

export default function MovieDetil() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    // search.js에서 직접 전달한 movie.id를 사용하여 영화 정보를 가져옵니다.
    const movieId = window.location.pathname.split('/').pop(); 

    setTimeout(() => {
    detailApi(movieId)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
        }, 1000); //
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  const handleSaveButtonClick = () => {
    setIsSaving((prevIsSaving) => !prevIsSaving);
  }

  return (
    <div>
      {
        loading && 
        <div className='container movie-detail'>
          <div className='the-movie'>
            <div className='poster skeleton'></div>
              <div className='specs'>
                <div className='title skeleton'></div>
                <div class="labels skeleton"></div>
                <div class="plot skeleton"></div>
              </div>
          </div>
          <div>
            <button class="btn btn-save skeleton"></button> 
          </div>
        </div>
      } 
      {
        error && 
        <p>오류가 발생했습니다: {error.message}</p>
      } 
      {
        movie && 
        <div className='container movie-detail'>
          <div className='the-movie'>
            <div
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.poster_path})` }}
              className='poster'></div>
            <div className='specs'>
              <div className='title'>
                {movie.title}
              </div>
              <div class="labels">
                <span>{formatDate(movie.release_date)}</span>
                &nbsp;/&nbsp;
                <span>평점 </span>
                <span>{movie.vote_average}</span>
              </div>
              <div class="plot">
                {movie.overview}
              </div>
            </div>
          </div>
          <div>
            <button 
              class="btn btn-save"
              onClick={handleSaveButtonClick}>
              SAVE This Movie
            </button> 
          </div>
          {
            isSaving && (
              <div className='my-movie'>
                내 영화 등록중...
              </div>
            )
          }
        </div>
      }
    </div>
  );
}
