'use client'

import { useRouter } from 'next/navigation';

export default function SearchPageMove() {
  const router = useRouter();

  const handleInputFocus = () => {
    router.push('/search'); 
  };

  return (
    <div className="search">
      <input
        placeholder="Enter the movie title to search"
        onFocus={handleInputFocus}
      />
      <button className="btn btn-primary">Search!</button>
    </div>
  );
}
