'use client';

import { signIn } from 'next-auth/react'

export default function SignInBtn() {
  return (
  <button onClick={() => { signIn() }} className="btn sign-in">로그인</button>
  )
} 