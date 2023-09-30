'use client'

import { useState, useEffect } from "react"
import { BiSolidColorFill } from 'react-icons/bi'

export default function Theme (){
  const savedTheme = localStorage.getItem("selectedTheme");
  const [theme, setTheme] = useState(savedTheme || 'red');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const themeHandler = (selectedTheme)=>{
    setTheme(selectedTheme);
    document.body.setAttribute('data-theme', selectedTheme);
    setIsDropdownOpen(false);

    // 로컬 스토리지에 테마 저장
    localStorage.setItem("selectedTheme", selectedTheme);
  }

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 테마 불러옴
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <div className="theme-dropdown">
      <button 
        className="btn-theme"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <BiSolidColorFill size='20'/>
      </button>
      {
        isDropdownOpen && (
        <div className="theme-options">
          <span className="red" 
            onClick={() => themeHandler("red")}></span>
          <span className="blue" 
            onClick={() => themeHandler("blue")}></span>
          <span className="green" 
            onClick={() => themeHandler("green")}></span>
        </div>
        )
      }
    </div>
  )
}