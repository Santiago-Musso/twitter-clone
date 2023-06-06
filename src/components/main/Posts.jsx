import { Link } from "react-router-dom"
import { ProfileImage } from "./ProfileImage"
import { LikeButton } from "./LikeButton"
import { CommentButton } from "./CommentButton"

export function Posts({type, post, user}) {
  return (
    <div className="max-w-xl p-2 cursor-pointer hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700/25 border-b border-r relative">
      <Link className='absolute w-full h-full z-10 top-0 left-0' to={`/${type}/${post.id}`} />
        <div className="grid grid-cols-[auto_1fr] gap-5">
        <ProfileImage src={user.photo} to={user.id}/>
          <div className="max-w-xl">
            <div className="mb-4">
              <h1 className="font-bold inline">{user.name}</h1><h5 className="text-gray-400 inline ml-2">@{user.username}</h5>
              <p className="text-sm pb-2">{post.tweet}</p>
              <img src={post.picURL} className="rounded-xl border-[0.5px] dark:border-slate-700 border-gray-400 mb-5"/>
            </div>
            <div className="flex justify-around dark:text-slate-400 w-full absolute left-0 bottom-0">
              <CommentButton post={post} type={type}/>
              <LikeButton id={post.id} likes={post.likes} type={type}/>
            </div>
          </div>
        </div>
    </div>
  )
}