// 'use client'

// import { useState } from "react"

// const API_KEY = "7d229ca04fa6f47f9241e1865a6ab0be"

// export default function MovieList() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [movies, setMovies] = useState([]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   }

//   const handleSearch = () => {
//     // 검색어가 입력되었을 때만 검색 실행
//     if (searchTerm) {
//       getMovies(
//         `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&language=ko&page=1®ion=KR&query=${searchTerm}`
//       );

//       setSearchTerm("");
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Enter 키로 폼을 제출하지 않도록 방지
//       handleSearch(); // 검색 함수 호출
//     }
//   }

//   const getMovies = async (url) => {
//     try {
//       const { results } = await (
//         await fetch(url)
//       ).json();
//       setMovies(results);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   }

//   return (
//     <div>
//       <h1>Movie</h1>
//       <div className="msearch">
//         <input
//           className="search"
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown} // Enter 키 입력 감지
//         />
//         <button onClick={handleSearch}>검색</button> {/* 검색 버튼 클릭 시 검색 함수 호출 */}
//       </div>
//       <div className="movie-container">
//         {movies.map((movie) => (
//           <div key={movie.id}>
//             <h2>{movie.title}</h2>
//             <p>{movie.overview}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
