import { Link } from "react-router-dom"
import { ProfileImage } from "./ProfileImage"
import { LikeButton } from "./LikeButton"

export function Posts({type, post, user}) {
  return (
    <div className="max-w-xl p-2 cursor-pointer hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700/25 border-b border-r relative">
      <Link className='absolute w-full h-full z-10 top-0 left-0' to={`/${type}/${post.id}`} />
        <div className="grid grid-cols-[auto_1fr] gap-5">
        <ProfileImage src={user.photo} to={user.username}/>
          <div className="max-w-xl">
            <div className="mb-4">
              <h1 className="font-bold inline">{user.name}</h1><h5 className="text-gray-400 inline ml-2">@{user.username}</h5>
              <p className="text-sm pb-2">{post.tweet}</p>
            </div>
            <div className="flex justify-around dark:text-slate-400 w-[575px] absolute left-0 bottom-0 pb-1">
              <span className="p-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 max-w-min z-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hover:text-sky-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
              </span>
              <LikeButton id={post.id} likes={post.likes} type={type}/>
            </div>
          </div>
        </div>
    </div>
  )
}