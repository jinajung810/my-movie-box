import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
    GithubProvider({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

      // //3. jwt + jwt 만료일설정
      // session: {
      //   strategy: 'jwt',
      //   maxAge: 30 * 24 * 60 * 60 //30일
      // },

      // callbacks: {
      //   //4. jwt 만들 때 실행되는 코드 
      //   //user변수는 DB의 유저정보담겨있고 token.user에 저장하면 jwt에 들어간다.
      //   jwt: async ({ token, user }) => {
      //     if (user) {
      //       token.user = {};
      //       token.user.id = user.id // 추가
      //       token.user.name = user.name
      //       token.user.email = user.email
      //     }
      //     return token;
      //   },
      //   //5. 유저 세션이 조회될 때 마다 실행되는 코드
      //   session: async ({ session, token }) => {
      //     session.user = token.user;  
      //     return session;
      //   },
      // },
  adapter: MongoDBAdapter(connectDB),
  secret : process.env.JWT_SECRET,

};
export default NextAuth(authOptions); 