
import Link from 'next/link'
import { SignOutBtn } from './signOut'

import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"

export default async function Header(){
  let session = await getServerSession(authOptions)

  return (
  <div className="nav-bar"> 
    <Link href="/main" className="logo">
      {session.user.name}'s <span>MOVIE</span> BOX
    </Link>
    <Link href="/search" className='searcg-menu'>
      Search
    </Link>
    <SignOutBtn />
  </div>
  )
}