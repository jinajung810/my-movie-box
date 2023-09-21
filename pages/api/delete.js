import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  if (req.method == 'DELETE') {

    const db = ( await connectDB).db('my-movie-box')
    let result = await db.collection('reviews').deleteOne({_id : new ObjectId(req.body)});

    // res.writeHead(302, { Location: '/main' });
    res.end();
  }
}