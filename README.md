# My Movie Box 🎬
The Movie Database (TMDB)를 활용해 영화를 검색하고, 영화 리뷰를 등록할 수 있는 나만의 영화 박스 📦  

![](https://velog.velcdn.com/images/jinajung/post/115de64d-2b66-4b44-bc41-d1453f7d44a8/image.png)

🎬 배포 URL <br/>
https://my-movie-box.vercel.app/

📌 테스트 계정 <br/>
이메일: test@test.com <br/>
비밀번호: test123 

## 프로젝트 설명 
### 구현 기능 
1. 메인 페이지 

<img width="500" src="https://velog.velcdn.com/images/jinajung/post/8f58427f-e8e1-4491-a0dd-9dbc7581a2a3/image.png"/>

- 로그인 하지 않은 경우 (sign up, sign in)
    - `Next-auth` 사용자 인증 로그인 (Github, Google)
    -  회원가입, 아이디/비밀번호 방식 로그인 

<img width="500" src="https://velog.velcdn.com/images/jinajung/post/115de64d-2b66-4b44-bc41-d1453f7d44a8/image.png"/>
<img width="500" src="https://velog.velcdn.com/images/jinajung/post/c6a94a3b-a279-42ec-b017-0df24e86ed6d/image.png"/>

-  로그인 한 경우
    - 회원 아이디가 포함된 logo로 로그인 상태 확인 가능 
    - 영화 검색 페이지 Link
    - 유저가 등록한 리뷰의 영화 포스터 목록
    - 리뷰의 별점별 목록 정렬 
    - 유저가 등록한 영화 포스터 클릭하면 리뷰 내용 보기, 수정, 삭제 기능
    - 컬러 테마 변경   

2. 영화 검색 페이지 

<img width="500" src="https://velog.velcdn.com/images/jinajung/post/2b421caa-4138-4129-b3ea-2c5b01747fab/image.png"/>

- 화면 상단에 검색 바 노출, 영화 검색시 결과 목록 구현 
- The Movie Database api로 한국영화 검색 
- 영화 목록에서 영화 포스터 클릭시 영화 디테일 페이지로 이동 

3. 영화 디테일 페이지 

<img width="500" src="https://velog.velcdn.com/images/jinajung/post/30b0b716-4394-4f87-8d92-38b7bbe8d95f/image.png"/>
<img width="500" src="https://velog.velcdn.com/images/jinajung/post/6dd6ef86-dc1a-4dfa-8c11-88a5cc87f853/image.png"/>

- 로딩 애니메이션 
- 영화의 포스터, 제목, 개봉일, 장르, 평점, 시놉시스 등 기본적인 영화 정보와 리뷰 등록 모달 
- 리뷰 등록 후 메인 페이지로 이동 

## 사용스택
- Next.js
- MongoDB
- CSS
- Vercel
