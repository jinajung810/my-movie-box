
import { connectDB } from "@/util/database"
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { SignOutBtn } from "../signOut"
import ReviewList from "../review-list"
import Theme from "../theme"

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
      <div className="nav-bar"> 
        <Link href="/main" className="logo">
          {session.user.name}'s <span>MOVIE</span> BOX
        </Link>
        <div>
          <Theme />
          <SignOutBtn />
        </div>
      </div>

      <div className="my-list">
        <ReviewList reviews={JSON.stringify(userReviews)}/>
      </div>
      
      <div className='footer'>
        <Link href='https://github.com/jinajung810/my-movie-box' target="_blank">
          GitHuv Repository
        </Link>
        &nbsp;・&nbsp;
        <Link href='https://mail.google.com/mail/?view=cm&fs=1&to=${email}' target="_blank">Contact Me!</Link>
        <span>{new Date().getFullYear()}</span>
        <span>Jina Jung</span>
      </div>
    </div>
  )
}