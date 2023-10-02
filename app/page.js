import { connectDB } from "@/util/database";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { SignOutBtn } from "./signOut";
import SignInBtn from "./signInBtn";
import ReviewList from "./review-list";
import {TbCubePlus } from 'react-icons/tb'
import Theme from "./theme";

export default async function Home() {
  let session = await getServerSession(authOptions);
  let user = session ? session.user.email : null; 

  if (!user) {
    return (
      <div className="container">
        <div className="nav-bar">
          <div className="logo">
            Your <p>MOVIE</p> BOX
          </div>
          <div>
            <Theme />
            <SignInBtn />
            <Link href='/signup' className="sign-up-text">Sign up</Link>
          </div>
        </div>
        <div className="not-login-list">
          <div className="not-login">
            <TbCubePlus size='40'/>
            <h2 className="not-login-message">
            It's an empty box.<br /> 
            <span>After signing in,</span> <br />
            search for a movie and add it.
            </h2>
          </div>
        </div>
        <div className='footer'>
          <Link href='https://github.com/jinajung810/my-movie-box' target="_blank">
            GitHub Repository
          </Link>
          &nbsp;・&nbsp;
          <Link href='https://mail.google.com/mail/?view=cm&fs=1&to=${email}' target="_blank">Contact Me!</Link>
          <span>{new Date().getFullYear()}</span>
          <span>Jina Jung</span>
        </div>
      </div>
    );
  }

  const db = (await connectDB).db("my-movie-box");
  let reviews = await db.collection('reviews').find().toArray();
  const userReview = reviews.filter((review) => review.author === user);

  const userReviews = userReview.map((review) => {
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
  });

  return (
    <div className="container">
      <div className="nav-bar">
        <div className="logo">
          {session.user ? `${session.user.name}'s ` : 'Your '}
          <p>MOVIE</p> BOX
        </div>
        <div>
          <Theme />
          <SignOutBtn />
        </div>
      </div>
      <div className="my-list">
        <ReviewList reviews={JSON.stringify(userReviews)} />
      </div>
      <div className='footer'>
        <Link href='https://github.com/jinajung810/my-movie-box' target="_blank">
          GitHub Repository
        </Link>
        &nbsp;・&nbsp;
        <Link href='https://mail.google.com/mail/?view=cm&fs=1&to=${email}' target="_blank">Contact Me!</Link>
        <span>{new Date().getFullYear()}</span>
        <span>Jina Jung</span>
      </div>
    </div>
  );
}