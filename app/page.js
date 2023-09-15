import SignInBtn from "./signInBtn";
import SignUpBtn from "./signUpBtn";

export default function Home() {

  return (
    <div className="container login-page">
      <div className="headline">
        <h1>
          Record<br />
          the <span>MOVIE</span>       
          I watched
        </h1>
      </div>
      <SignInBtn />
      <SignUpBtn />
    </div>
  )
}