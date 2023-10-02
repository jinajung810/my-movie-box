import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
      const hash = await bcrypt.hash(req.body.password, 10);
      const hashC = await bcrypt.hash(req.body.passwordCheck, 10);
      req.body.password = hash;
      req.body.passwordCheck = hashC
      let userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }

      let db = (await connectDB).db('my-movie-box');
      await db.collection('user_cred').insertOne(userInfo);
      res.status(200).json({message: '회원가입 성공!'})
  }
};
