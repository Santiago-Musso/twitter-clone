import { useState } from "react"

export function LikeButton (){

  const [like, setLike] = useState('false')
  const handleLikeClick = () => setLike(true)

  return (
    <span className="p-1 rounded-full hover:bg-red-500/30 max-w-min z-20" onClick={handleLikeClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} className="svgLike w-4 h-4 hover:text-red-500 fill-none stroke-current ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </span>
  )
}