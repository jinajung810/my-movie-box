'use client'

import { useEffect, useState, useRef } from 'react';
import { detailApi } from "@/pages/api/movies";
import { Rating } from '@mui/material';

export default function NewReviewModal ({ isOpen, onClose,  movieId })  {
  const [starValue, setStarValue] = useState(2.5);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // movieId를 이용해 영화 정보를 가져옵니다.
    detailApi(movieId)
      .then((data) => {
        setMovie(data);
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

  return (
    <div className="new-modal" onClick={handleModalClick}>
      <div className='new-review' ref={modalRef}>
        <form action="/api/new" method='POST'>
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
            </div>
          }
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
                name='star'
              />
            </div>
            <span className='favorite-line-text'>Favorite Line</span>
            <textarea name="favoriteLine" className='favorite-line' rows="2" />
            <span className='memo-text'>My Memo</span>
            <textarea name="memo" className='memo' rows="6" />
          </div>
          <div className='save-btn'>
            <button type="submit" className='btn btn-save'>Save</button>
            <button onClick={onClose} className='btn btn-back'>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};