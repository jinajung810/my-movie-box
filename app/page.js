'use client'

import SignInBtn from "./signInBtn";
import SignUpBtn from "./signUpBtn";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    // 로컬 스토리지에서 테마 가져오기
    const savedTheme = localStorage.getItem("selectedTheme");

    // 가져온 테마가 있다면 적용
    if (savedTheme) {
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []); // 빈 배열을 넘겨주어 컴포넌트가 마운트될 때 한 번만 실행

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