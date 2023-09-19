import { connectDB } from "@/util/database"

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { date } = req.body;
    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;

    if (!datePattern.test(date)) {
      return res.status(500).json('날짜 형식을 YY/MM/DD로 작성해주세요')
    }
    const db = ( await connectDB).db('my-movie-box')
    let result = await db.collection('reviews').insertOne(req.body)
    
    res.writeHead(302, { Location: '/main' });
    res.end();
  }
}