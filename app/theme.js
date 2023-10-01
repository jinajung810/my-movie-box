'use client'

import { useState, useEffect } from "react";
import { IoIosColorPalette } from 'react-icons/io';

export default function Theme() {
  if (typeof window !== 'undefined') { // 클라이언트에서만 실행되도록 환경을 확인
    const savedTheme = localStorage.getItem("selectedTheme");
    const [theme, setTheme] = useState(savedTheme || 'red');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const themeHandler = (selectedTheme) => {
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
          <IoIosColorPalette size='18' />
        </button>
        {isDropdownOpen && (
          <div className="theme-options">
            <span className="red"
              onClick={() => themeHandler("red")}></span>
            <span className="blue"
              onClick={() => themeHandler("blue")}></span>
            <span className="green"
              onClick={() => themeHandler("green")}></span>
          </div>
        )}
      </div>
    );
  }

  return null; // 클라이언트가 아닌 환경에서는 null을 반환
}
