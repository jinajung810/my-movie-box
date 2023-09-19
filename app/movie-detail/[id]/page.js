'use client'

import { useEffect, useState } from 'react';
import { detailApi } from "@/pages/api/movies";
import { Rating } from '@mui/material'

export default function MovieDetil() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [starValue, setStarValue] = useState(2.5);

  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    // search.js에서 직접 전달한 movie.id를 사용하여 영화 정보를 가져옵니다.
    const movieIdFromPath = window.location.pathname.split('/').pop(); 
    setMovieId(movieIdFromPath); // movieId 상태 설정

    setTimeout(() => {
    detailApi(movieIdFromPath)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    }, 1000); 

  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const handleSaveButtonClick = () => {
    setIsSaving((prevIsSaving) => !prevIsSaving);
  }

  function formatRuntime(runtimeInMinutes) {
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;
  
    // 시간과 분을 합쳐서 문자열로 반환
    if (hours === 0) {
      return `${minutes}m`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  const handleRatingChange = (event, newValue) => {
    setStarValue(newValue); // 선택한 별점 값을 상태에 업데이트
    // 여기서 newValue를 사용하여 데이터베이스에 저장하는 로직을 추가할 수 있습니다.
    console.log(newValue)
  };


  return (
    <div>
      {
        loading && 
        <div className='container movie-detail'>
          <div className='the-movie'>
            <div className='poster skeleton'></div>
              <div className='specs'>
                <div className='title skeleton'></div>
                <div className="labels skeleton"></div>
                <div className="plot skeleton"></div>
              </div>
          </div>
          <div>
            <button className="btn btn-save skeleton"></button> 
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
              <div className="labels">
                <span>{formatDate(movie.release_date)}</span>
                &nbsp;・&nbsp;
                {
                  movie.genres.map((genre, i) => (
                    <span key={genre.id}>
                      {genre.name}
                      {i !== movie.genres.length - 1 && '/'}
                    </span>
                ))}
                &nbsp;・&nbsp;
                <span>{formatRuntime(movie.runtime)}</span>
                &nbsp;・&nbsp;
                <span>평점 </span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <span className='tagline'>{movie.tagline}</span>
              <div className="plot">
                {movie.overview}
              </div>
            </div>
          </div>
          <div>
            <button 
              className="btn btn-save"
              onClick={handleSaveButtonClick}>
              My Review
            </button> 
          </div>
          {
            isSaving && (
              <div className='my-review'>
                <form action="/api/review" method='POST'>
                <input type="hidden" name="movieId" value={movieId} />
                  <div className='my-review-text-area'>
                    <div className='review-basic'>
                      <div>
                        <span>Date</span>
                        <input name="date" placeholder='YY/MM/DD'/>
                      </div>
                      <div>
                        <span>Where</span>
                        <input name="where" />
                      </div>
                      <div>
                        <span>With</span>
                        <input name="with" />
                      </div>
                    </div>
                    <div className='star-value'>
                      <span className='rate-text'>Rate</span>
                      <Rating 
                        precision={0.5}
                        value={starValue}
                        onChange={handleRatingChange}
                      />
                    </div>
                    <span className='favorite-line-text'>Favorite Line</span>
                    <textarea name="favorite-line" className='favorite-line' rows="2" />
                    <span className='memo-text'>My Memo</span>
                    <textarea name="memo" className='memo' rows="6" />
                  </div>
                  <div className='movie-info'>
                    <div
                      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.poster_path})` }}
                      className='poster'></div>
                    <div className='title'>
                      {movie.title}
                    </div>
                    <div className="labels">
                      <span>{formatDate(movie.release_date)}</span>
                      &nbsp;・&nbsp;
                      {
                        movie.genres.map((genre, i) => (
                          <span key={genre.id}>
                            {genre.name}
                            {i !== movie.genres.length - 1 && '/'}
                          </span>
                      ))}
                      &nbsp;・&nbsp;
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  </div>
                  <div className='save'>
                    <button type="submit" className='btn btn-save'>Save</button>
                  </div>
                </form>
              </div>
            )
          }
        </div>
      }
    </div>
  );
}
