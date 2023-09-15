// 'use client'

import Header from "../header"
import {useRouter} from 'next/navigation'

export default function main(){

  // let router = useRouter()

  return (
    <div className="container">
      <Header />
      <div className="search">
        <input 
          // onFocus={()=>{ router.push('/search')}}
          placeholder = "Enter the movie title to search"/>
        <button className="btn btn-primary" >
          Search!
        </button>
    </div>
      <div className="my-list">
        <h2 className="empty-message">
          Fill out your own <span>movie</span> box.
        </h2>
      </div>
    </div>
  )
}