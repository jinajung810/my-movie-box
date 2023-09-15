'use client';

import { signOut } from 'next-auth/react'

export function SignOutBtn(){
  return (
      <button onClick={()=>{ signOut() }} className='btn nav-sign-out'>Sign out</button>
  )
}

