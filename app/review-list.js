'use client'

import { detailApi } from "@/pages/api/movies"
import { useEffect, useState } from "react"
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MyReviewModal from "./MyReviewModal";
import Link from "next/link";
import {TbCubePlus } from 'react-icons/tb'

export default function ReviewList({reviews}){
  const initialReviews = JSON.parse(reviews);
  
  const [moviePosters, setMoviePosters] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(initialReviews.map(() => false));
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState(initialReviews); // 추가: 필터링된 리뷰 목록

  useEffect(()=>{
    const fetchMovie = async() =>{
      const posters = [];
      const filtered = initialReviews.filter(review => selectedStar === null || parseFloat(review.star) === selectedStar); // 별점 필터링 적용
      for ( const review of filtered ){
        try {
          const movieDetails = await detailApi(review.movieId);
          if(movieDetails && movieDetails.poster_path) {
            posters.push(`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`);
          } else {
            posters.push('Image Not Found')
          } 
        }
        catch(error) {
          console.error('Error fetching movie details:', error)
          posters.push('Error')
        }
      }
      setMoviePosters(posters);
      setFilteredReviews(filtered); // 필터링된 리뷰 업데이트
    }
    fetchMovie();
  }, [selectedStar]); // selectedStar 상태가 변경될 때마다 실행

  const openModal = (index) => {
    setSelectedReview(index);
    const updatedIsModalOpen = [...isModalOpen];
    updatedIsModalOpen[index] = true;
    setIsModalOpen(updatedIsModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (index) => {
    setSelectedReview(null);
    const updatedIsModalOpen = Array(initialReviews.length).fill(false);
    setIsModalOpen(updatedIsModalOpen);
    document.body.style.overflow = "unset";
    window.location.reload(); // 페이지 새로고침
  };
  
  return (
    <div className="reviews">
      <div className="star-list">
        <span className="filter-label">Filter by :</span>
        <Rating 
        value={selectedStar}
        onChange={(event, newValue) => {
          // "전체 리뷰 보기"를 선택한 경우, selectedStar를 null로 설정
          setSelectedStar(newValue === selectedStar ? null : newValue);
        }}
        precision={0.5}
        emptyIcon={<StarIcon style={{ fill: 'transparent', stroke: '#faaf00' }}  fontSize="inherit" />} 
        className="star-filter"/>
        {/* "전체 리뷰 보기" 버튼 */}
        <button
          onClick={() => setSelectedStar(null)}
          className="show-all-button">
          Show All Reviews
        </button>
      </div>
      <Link href="/search">
        <div className="add-review">
          <TbCubePlus size='40'/>
          <h2 className="add-message">
            Fill out <br />your own <span> movie</span> box.
          </h2>
        </div>
      </Link>
      {
        filteredReviews.map((review, index) => ( // 필터링된 리뷰 사용
          <div 
            onClick={() => openModal(index)}
            key={review._id} 
            className="review">
            <img src={moviePosters[index]} alt="" />
            <Rating 
              value={parseFloat(review.star)} 
              className="star"
              precision={0.5}
              readOnly />
          </div>
      ))}
      {
      selectedReview !== null && 
      (
        <MyReviewModal 
          isOpen={isModalOpen[selectedReview]}
          onClose={closeModal}
          review={initialReviews[selectedReview]}/>
      )}
    </div>
  )
}
