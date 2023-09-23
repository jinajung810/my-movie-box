import { connectDB } from "@/util/database"
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"

import Header from "../header"
import SearchPageMove from "../searchPageMove"
import ReviewList from "../review-list"

export default async function main(){
  let session = await getServerSession(authOptions)
  let user = session.user.email

  const db = (await connectDB).db("my-movie-box")
  let reviews = await db.collection('reviews').find().toArray()
  const userReaview = reviews.filter((review) => review.author === user)
  
  const userReviews = userReaview.map(review => {
    return {
      _id: review._id.toString(),
      author: review.author,
      movieId: review.movieId,
      date: review.date,
      where: review.where,
      with: review.with,
      star: review.star,
      favoriteLine: review.favoriteLine,
      memo: review.memo,
    };
  })

  return (
    <div className="container">
      <Header />
      <SearchPageMove />
      <div className="my-list">
        {
          userReaview.length === 0 ? (
            <h2 className="empty-message">
              Fill out your own <span>movie</span> box.
            </h2>
          ) : (
            <ReviewList reviews={JSON.stringify(userReviews)}/>
          )
        }
      </div>
    </div>
  )
}