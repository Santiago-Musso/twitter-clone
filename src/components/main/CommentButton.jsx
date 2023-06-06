import { CommentModal } from "./CommentModal"
import { useState } from "react"

export function CommentButton({ post, type }){
  const [active, setActive] = useState(false)

  return (
    <>
      <span className="p-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 max-w-min z-20" onClick={() => setActive(!active)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hover:text-sky-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
        </svg>
      </span>
      <CommentModal post={post} type={type} active={active} onClose={() => setActive(false)}/>
    </>
  )
}