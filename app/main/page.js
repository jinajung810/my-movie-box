
import Header from "../header"
import SearchPageMove from "../searchPageMove"

export default function main(){


  return (
    <div className="container">
      <Header />
      <SearchPageMove />
      <div className="my-list">
        <h2 className="empty-message">
          Fill out your own <span>movie</span> box.
        </h2>
      </div>
    </div>
  )
}