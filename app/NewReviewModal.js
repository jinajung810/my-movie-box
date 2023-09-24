'use client'

import { useState, useRef } from 'react';
import { Rating } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai'

export default function NewReviewModal ({ isOpen, onClose,  movieId })  {
  const [starValue, setStarValue] = useState(2.5);

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
    <div className="new-modal" onClick={handleModalClick} >
        <form action="/api/new" method='POST' className='new-review' ref={modalRef}>
          <input type="hidden" name="movieId" value={movieId} />
          <button onClick={onClose} className='close'>
            <AiOutlineClose />
          </button>
          <Rating 
            className='star'
            precision={0.5}
            value={starValue}
            onChange={handleRatingChange}
            name='star'
          />
          <div className='review-text'>
            <div className='date'>
              <span>Date</span>
              <input name="date" placeholder='YY/MM/DD'/>
            </div>
            <div className='where'>
              <span>Where</span>
              <input name="where" />
            </div>
            <div className='with'>
              <span>With</span>
              <input name="with" />
            </div>
          </div>
          <div className='favorite-line'>
            <span>Favorite Line</span>
            <textarea name="favoriteLine" rows="2" />
          </div>
          <div className='memo'>
            <span>My Memo</span>
            <textarea name="memo" rows="6" />
          </div>
          <button type="submit" className='btn-save'>Save</button>
        </form>
    </div>
  );
};