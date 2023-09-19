'use client'

import { useEffect, useState, useRef } from 'react';
import { detailApi } from "@/pages/api/movies";
import { Rating } from '@mui/material';

const ReviewModal = ({ isOpen, onClose,  movieId }) => {
  const [starValue, setStarValue] = useState(2.5);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // movieId를 이용해 영화 정보를 가져옵니다.
    detailApi(movieId)
      .then((data) => {
        setMovie(data);
        console.log('성공?', data)
      })
      .catch((error) => {
        setError(error);
      });
  }, [movieId]);

  const modalRef = useRef(null);
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // 모달 닫기
    }
  };
  
  if (!isOpen) return null;

  const handleRatingChange = (event, newValue) => {
    setStarValue(newValue);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
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

  return (
    <div className="modal" onClick={handleModalClick}>
      <div className='modal-review' ref={modalRef}>
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
        {
          error && 
          <p>오류가 발생했습니다: {error.message}</p>
        } 
        {
          movie && 
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
                movie.genres.slice(0, 3).map((genre, i) => (
                  <span key={genre.id}>
                    {genre.name}
                    {i !== movie.genres.length - 1 && '/'}
                  </span>
                ))}
              &nbsp;・&nbsp;
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
          </div>
        }

        <div className='save-btn'>
          <button onClick={onClose} className='btn btn-back'>Back</button>
          <button type="submit" className='btn btn-save'>Save</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ReviewModal;