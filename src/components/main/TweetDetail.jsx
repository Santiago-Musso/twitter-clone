import { Link, useParams } from "react-router-dom"
import { ProfileImage } from "./ProfileImage"
import { useEffect, useState } from "react"
import { doc, collection, getDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"

export function TweetDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [user, setUser] = useState('')

  const getUser = (uid) => {
    const collectionUsers = collection(db,'users')
    const docRef = doc(collectionUsers, uid)

    getDoc(docRef). then(user => {
      setUser(user.data())
    })
  }

  const getPost = async () => {
    const collectionPosts = collection(db,'posts')
    const docRef = doc(collectionPosts, id)

    await getDoc(docRef). then(post => {
      setPost(post.data())
      getUser(post.data().user)
    })
  }
  
  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="max-w-xl p-5 cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-white border-b border-x">
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
          <ProfileImage src={user.photo} to={user.username} />
          <div>
            <h1 className="font-bold">{user.name}</h1>
            <h5 className="text-gray-400">@{user.username}</h5>
          </div>
        </div>
        <div className="max-w-xl">
          <div className="mb-4">
            <p className="text-xl">{post.tweet}</p>
          </div>
          <div className="flex flex-row place-content-around dark:text-slate-400">
            <span className="p-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 max-w-min">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hover:text-sky-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
            </span>
            <span className="p-1 rounded-full hover:bg-green-500/20 max-w-min">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 12 12" className="hover:text-green-500">
                <path fill="currentColor" d="M2.511 2c.021 0 .042.002.063.005l.031.006.046.012.04.015a.494.494 0 01.093.05l.018.014c.014.01.027.02.04.033l2.012 2.011a.5.5 0 01-.638.765l-.07-.057L3 3.707V7.5a1.5 1.5 0 001.356 1.493L4.5 9H6a.5.5 0 01.09.992L6 10H4.5a2.5 2.5 0 01-2.495-2.336L2 7.5V3.707L.854 4.854a.5.5 0 01-.765-.638l.057-.07L2.16 2.135l.019-.017.01-.009-.042.037.047-.041.04-.028a.52.52 0 01.162-.066l.036-.006L2.5 2h.011zM7.5 2A2.5 2.5 0 0110 4.5v3.792l1.146-1.146a.5.5 0 01.765.638l-.057.07-2 2-.013.011a.503.503 0 01-.039.033l.052-.044A.502.502 0 019.5 10l.072-.005A.503.503 0 019.52 10H9.5a.509.509 0 01-.284-.089l-.018-.013a.503.503 0 01-.04-.033l-.012-.011-2-2a.5.5 0 01.638-.765l.07.057L9 8.292V4.5a1.5 1.5 0 00-1.356-1.493L7.5 3H6a.5.5 0 010-1zm-5.302.102l-.005.003-.005.004.01-.007zm.239-.098l-.006.001h-.005l.011-.001zm.014-.002l-.014.002.01-.001.004-.001zM2.5 2l-.049.002A.868.868 0 012.489 2H2.5z" />
              </svg>
            </span>
            <span className="p-1 rounded-full hover:bg-red-500/30 max-w-min">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </span>
            <span className="p-1 rounded-full hover:bg-blue-800/20 max-w-min">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 hover:text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}