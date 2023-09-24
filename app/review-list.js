'use client'

import { detailApi } from "@/pages/api/movies"
import { useEffect, useState } from "react"
import { Rating } from '@mui/material';
import MyReviewModal from "./MyReviewModal";
import Link from "next/link";
import {TbCubePlus } from 'react-icons/tb'

export default function ReviewList({reviews}){
  const parsedReviews = JSON.parse(reviews);
  
  const [moviePosters, setMoviePosters] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(parsedReviews.map(() => false));
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(()=>{
    const fetchMovie = async() =>{
      const posters = [];
      for ( const review of parsedReviews ){
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
      setMoviePosters(posters)
    }
    fetchMovie();
  },[])

  const openModal = (index) => {
    setSelectedReview(index);
    const updatedIsModalOpen = [...isModalOpen];
    updatedIsModalOpen[index] = true;
    setIsModalOpen(updatedIsModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (index) => {
    setSelectedReview(null);
    const updatedIsModalOpen = Array(parsedReviews.length).fill(false);
    setIsModalOpen(updatedIsModalOpen);
    document.body.style.overflow = "unset";
    window.location.reload(); // 페이지 새로고침
  };
  
  return (
    <div className="reviews">
      <Link href="/search">
        <div className="add-review">
          <TbCubePlus size='40'/>
          <h2 className="add-message">
            Fill out <br />your own <span> movie</span> box.
          </h2>
        </div>
      </Link>
      {
        parsedReviews.map((review, index) => (
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
          review={parsedReviews[selectedReview]}/>
      )}
    </div>
  )
}