import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == 'POST'){
    const updateValue = JSON.parse(req.body);
    const { date } = updateValue
    const datePattern = /^\d{2}\/\d{2}\/\d{2}$/;

    console.log(updateValue._id)
    if (!datePattern.test(date)) {
      return res.status(400).json('날짜 형식을 YY/MM/DD로 작성해주세요')
    }

    let updateReview = {
      date: updateValue.date,
      where: updateValue.where,
      with: updateValue.with,
      star: updateValue.star,
      favoriteLine: updateValue.favoriteLine,
      memo: updateValue.memo
    };

    let db = (await connectDB).db('my-movie-box')
    let result = await db.collection('reviews').updateOne(
      {_id : new ObjectId(updateValue._id)}, 
      { $set: updateReview } 
    );
    console.log(result)

    res.end()
  }
}