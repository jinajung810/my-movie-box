'use client'

import { useState, useRef } from 'react';
import { Rating } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

export default function NewReviewModal({ isOpen, onClose, movieId }) {
  const [starValue, setStarValue] = useState(2.5);
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef(null);
  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose(); // 모달 닫기
    }
  };

  const handleRatingChange = (event, newValue) => {
    setStarValue(newValue);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 여기에서 유효성 검사를 수행하고, 유효하지 않을 경우 오류 메시지 설정
    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;
    const dateInput = e.target.date.value;

    if (!datePattern.test(dateInput)) {
      setErrorMessage('날짜 형식을 YY/MM/DD로 작성해주세요');
      return;
    }

    // AJAX 요청을 사용하여 데이터를 서버로 전송
    const formData = new FormData(e.target);
    try {
      const response = await fetch('/api/new', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // 데이터 전송 성공 시 모달 닫기
        onClose();
      } else {
        // 데이터 전송 실패 시 오류 메시지 표시
        setErrorMessage('데이터 전송에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 오류 등으로 인한 실패 시 오류 메시지 표시
      setErrorMessage('데이터 전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="new-modal" onClick={handleModalClick}>
      <form onSubmit={handleFormSubmit} className="new-review" ref={modalRef}>
        <input type="hidden" name="movieId" value={movieId} />
        <button onClick={onClose} className="close">
          <AiOutlineClose />
        </button>
        <Rating
          className="star"
          precision={0.5}
          value={starValue}
          onChange={handleRatingChange}
          name="star"
        />
        <div className="review-text">
          <div className="date">
            <span>Date</span>
            <input name="date" placeholder="YY/MM/DD" />
          </div>
          <div className="where">
            <span>Where</span>
            <input name="where" />
          </div>
          <div className="with">
            <span>With</span>
            <input name="with" />
          </div>
        </div>
        <div className="favorite-line">
          <span>Favorite Line</span>
          <textarea name="favoriteLine" rows="2" />
        </div>
        <div className="memo">
          <span>My Memo</span>
          <textarea name="memo" rows="6" />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="btn-save">
          Save
        </button>
      </form>
    </div>
  );
}
