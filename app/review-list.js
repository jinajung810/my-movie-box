'use client'

import { detailApi } from "@/pages/api/movies"
import { useEffect, useState } from "react"
import { Rating } from '@mui/material';


export default function ReviewList({reviews}){
  const parsedReviews = JSON.parse(reviews);
  const [moviePosters, setMoviePosters] = useState([])

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
  },[parsedReviews])
  
  return (
    <div className="reviews">
      {parsedReviews.map((review, index) => (
        <div key={review._id} className="review">
          <img src={moviePosters[index]} alt="" />
          <Rating 
            value={parseFloat(review.star)} 
            className="star"
            readOnly />
        </div>
      ))}
    </div>
  )
}