'use client'

import { useState, useEffect, useRef } from "react";
import { detailApi } from "@/pages/api/movies";
import { Rating } from '@mui/material';
import {AiOutlineClose} from 'react-icons/ai'

const MyReviewModal = ({ isOpen, onClose, review }) => {
  if (!isOpen) return null;

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editReview, setEditReview] = useState({
    _id: review._id,
    date: review.date,
    where: review.where,
    with: review.with,
    star: review.star,
    favoriteLine: review.favoriteLine,
    memo: review.memo,
  });

  const movieId = review.movieId;
  useEffect(() => {
    // movieId를 이용해 영화 정보가져오기
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

  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드로 변경
  };
  const handleCancelEditClick = () => {
    setIsEditing(false); // 수정 모드 해제
    onClose(); // 모달 닫기
    closeModal(); 
  };

  const handleDeleteClick = async () => {
    try {
      editReview._id = review._id;
      const response = await fetch('api/delete', {
        method: 'DELETE',
        body: review._id,
      });
      if (response.ok) {
        setIsEditing(false); // 수정 모드 해제
        onClose(); // 모달 닫기
      } else {
        // 서버에서 오류 응답이 온 경우
        if (response.status === 400) {
          // 클라이언트 측에서 알림 창 띄우기
          alert('날짜 형식을 YY/MM/DD로 작성해주세요');
        } else {
          // 다른 서버 오류 처리
          console.error('서버 오류:', response.status);
        }
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('오류 발생:', error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch('api/edit', {
        method: 'POST',
        body: JSON.stringify(editReview),
      });
  
      if (response.ok) {
        setIsEditing(false); // 수정 모드 해제
        onClose(); // 모달 닫기
      } else {
        // 서버에서 오류 응답이 온 경우
        if (response.status === 400) {
          // 클라이언트 측에서 알림 창 띄우기
          alert('날짜 형식을 YY/MM/DD로 작성해주세요');
        } else {
          // 다른 서버 오류 처리
          console.error('서버 오류:', response.status);
        }
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('오류 발생:', error);
    }
  };
  
  return (
    <div className="my-modal" onClick={handleModalClick}>
      <form className="my-review-box" ref={modalRef}>
      <input type="hidden" name="id" value={review._id} />
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
        </div>
      }
      <div className='my-review'>
        <button onClick={onClose} className='close'>
          <AiOutlineClose />
        </button>
        <Rating 
          defaultValue={parseFloat(review.star)} 
          precision={0.5}
          className="star"
          readOnly={!isEditing}
          onChange={(event, newValue) => {
            setEditReview({ ...editReview, star: newValue }); }}
          name="star"/>
        <div className='review-text'>
          <div className="date">
            <span>Date</span>
            {isEditing ? (
              <input 
                name="date" 
                placeholder='YY/MM/DD' 
                onChange={(e) => setEditReview({ ...editReview, date: e.target.value })} />
            ) : (
              <input 
                name="date" 
                defaultValue={review.date} 
                disabled />
            )}
          </div>
          <div className="where">
            <span>Where</span>
            {isEditing ? (
              <input 
                name="where" 
                onChange={(e) => setEditReview({ ...editReview, where: e.target.value })} />
            ) : (
              <input 
                name="where" 
                defaultValue={review.where} disabled />
            )}
          </div>
          <div className="with">
            <span>With</span>
            {isEditing ? (
              <input 
              name="with" 
              onChange={(e) => setEditReview({ ...editReview, with: e.target.value })} />
            ) : (
              <input 
                name="with" 
                defaultValue={review.with} 
                disabled />
            )}
          </div>
        </div>
        <div className='favorite-line'>
          <span>Favorite Line</span>
          {isEditing ? (
            <textarea 
              name="favoriteLine" 
              className='favorite-line' 
              rows="2" 
              onChange={(e) => setEditReview({ ...editReview, favoriteLine: e.target.value })} />
          ) : (
            <textarea 
              name="favoriteLine" 
              className='favorite-line' 
              rows="2" 
              defaultValue={review.favoriteLine} 
              disabled />
          )}
        </div>
        <div className='memo'>
          <span>My Memo</span>
          {isEditing ? (
            <textarea 
              name="memo" 
              className='memo' 
              rows="6" 
              onChange={(e) => setEditReview({ ...editReview, memo: e.target.value })} />
          ) : (
            <textarea 
              name="memo" 
              className='memo' 
              rows="6" 
              defaultValue={review.memo} 
              disabled />
          )}
        </div>
        {isEditing ? (
          <div>
            <button 
              type="button" 
              onClick={handleUpdateClick}
              className="review-btn save">
                Save</button>
          </div>
        ) : (
          <div className="review-btns">
            <button 
              type="button" 
              onClick={handleEditClick} 
              className='review-btn edit'>
                Edit</button>
            <button 
              type="button" 
              onClick={handleDeleteClick} 
              className='review-btn'>
                Delete</button>
          </div>
        )}
      </div>
      </form>
    </div>
  );
}

export default MyReviewModal;
