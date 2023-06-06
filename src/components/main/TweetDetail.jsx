import { Link, useParams } from "react-router-dom"
import { ProfileImage } from "./ProfileImage"
import { RepliesList } from "./RepliesList"
import { NewReply } from "./NewReply"
import { usePosts } from "../../hooks/usePosts"
import { LikeButton } from "./LikeButton"

export function TweetDetail({ type }) {
  const { id } = useParams()
  const { post, user, replies, timestamp } = usePosts(type, id)
  return (
    <div className="max-w-xl cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-white border-l">
      <div className="pl-5 pr-5 pt-5 border-r dark:bg-slate-800 dark:border-slate-700 dark:text-white">
        <div className="grid grid-cols-[auto_1fr] gap-4 mb-4">
          <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">Tweet</h1>
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-5">
          <div className="grid grid-cols-[auto_1fr] gap-5">
            <ProfileImage src={user.photo} to={user.id} />
            <div>
              <h1 className="font-bold">{user.name}</h1>
              <h5 className="text-gray-400">@{user.username}</h5>
            </div>
          </div>
          <div className="max-w-xl">
            <div className="mb-4">
              <p className="text-xl">{post.tweet}</p>
            </div>
            <div>
            <img src={post.picURL} className="rounded-xl border-[0.5px] dark:border-slate-700 border-gray-400 mb-5"/>
            </div>
            <div>
              <h6 className="text-sm text-gray-400 p-2">{timestamp}</h6>
            </div>
            <div className="border-t p-1 dark:bg-slate-800 dark:border-slate-700 flex flex-row gap-3">
              <div className="flex flex-row text-gray-400 gap-1"><h4 className="text-black dark:text-white font-semibold">{replies.length}</h4>Comentarios</div>
              <div className="flex flex-row text-gray-400 gap-1"><h4 className="text-black dark:text-white font-semibold">{post.likes !== undefined ? post.likes.length : 0}</h4>Me gusta</div>
            </div>
            <div className="border-t p-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
              <div className="flex flex-row place-content-around dark:text-slate-400">
                <span className="p-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 max-w-min">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hover:text-sky-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                </span>
              <LikeButton likes={post.likes} id={id} type={type}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t dark:bg-slate-800 dark:border-slate-700 dark:text-white ">
        <NewReply/>
        <RepliesList repliesID={replies}/>
      </div>
    </div>
  )
}