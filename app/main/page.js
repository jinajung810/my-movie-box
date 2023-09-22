import { connectDB } from "@/util/database"
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"
import ReviewList from "../review-list"

export default async function main(){
  let session = await getServerSession(authOptions)
  let user = session ? session.user.email : 'my'
  
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
      <div className="my-list">
        <ReviewList reviews={JSON.stringify(userReviews)}/>
      </div>
    </div>
  )
}