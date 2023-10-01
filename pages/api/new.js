import { connectDB } from "@/util/database"
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  if (req.method == 'POST') {
    
    let session = await getServerSession(req, res, authOptions)

    let collection = {
      author: session.user.email,
      movieId: req.body.movieId,
      date: req.body.date,
      where: req.body.where,
      with: req.body.with,
      star: req.body.star,
      favoriteLine: req.body.favoriteLine,
      memo: req.body.memo
    }
    
    const db = ( await connectDB).db('my-movie-box')
    let result = await db.collection('reviews').insertOne(collection)
    
    res.writeHead(302, { Location: '/main' });
    res.end();
  }
}