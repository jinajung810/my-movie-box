'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Register() {
  const [error, setError] = useState("");
  const navigation = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인을 비교
    if (formData.password !== formData.passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    } 
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // 서버에서 전달한 JSON 데이터를 읽음
        alert(data.message);
        navigation.push('/');
      } else {
        // 서버 오류 메시지를 알림창으로 표시
        alert(`회원가입 실패: ${response.status}`);
      }
    } catch (error) {
      // 네트워크 오류 또는 예외 처리 메시지를 알림창으로 표시
      alert("오류 발생: " + error.message);
    }
    // 폼 데이터 초기화
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    });
    setError("");
  };

  return (
    <div className="container sign-up">
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          type="text" 
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          name="passwordCheck"
          type="password"
          placeholder="password check"
          value={formData.passwordCheck}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">
          가입하기
        </button>
      </form>
    </div>
  );
}
