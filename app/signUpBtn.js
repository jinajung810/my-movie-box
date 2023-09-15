'use client';

import Link from "next/link";

export default function SignUpBtn() {
  return (
    <Link href="/register" className="link">
      <button className="btn sign-up">회원가입</button>
    </Link>
  )
} 