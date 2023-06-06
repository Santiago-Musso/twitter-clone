import { useState } from "react"
import { useUserPosts } from "../../hooks/useUserPosts"
import { Posts } from "./Posts"
import { Link, useParams } from "react-router-dom"
import { usePostsLists } from "../../hooks/usePostsList"


export default function Profile(){
  const { id } = useParams()
  const { userPosts, user, userPostsLiked, userRepliesLiked } = useUserPosts(id)
  const [inPosts, setInPosts] = useState(true)
  const { users } = usePostsLists()

  const setTimestamp = (timestamp) => {
    const userCreatedAt = new Date(Number(timestamp))
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
    return userCreatedAt.toLocaleDateString('es-ES', options)
  }

  const handleClickProfile = (e) => {
    const likesButton = document.getElementById('profileLikes')
    const postsButton = document.getElementById('profilePosts')

    if(e.target.id === 'profileLikes'){
      setInPosts(false)
      postsButton.setAttribute('aria-checked', false)
      likesButton.setAttribute('aria-checked', true)
    }else{
      setInPosts(true)
      likesButton.setAttribute('aria-checked', false)
      postsButton.setAttribute('aria-checked', true)
    }
  }
  return (
    user ? 
      <div className="max-w-xl cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-white border-l">
        <div className='p-5 border-r dark:bg-slate-800 dark:border-slate-700 dark:text-white'>
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <Link to='/'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">{user.name}</h1>
          </div>
          <div>

          </div>
        </div>
        <div className="dark:border-slate-700 max-w-xl border-r h-60">
          <img to={`user/${id}`} src={user.photo} className="rounded-full p-5"/>
          <h2 className="text-lg font-bold pl-4">{user.name}</h2>
          <h3 className="pl-4 text-gray-400">{`@${user.username}`}</h3>
          <h4 className="pl-4 text-gray-400">{`Usuario desde: ${setTimestamp(user.createdAt)}`}</h4>
        </div>
        <div className="dark:border-slate-700 max-w-xl border-b border-r grid grid-cols-2">
          <div className="dark:hover:bg-slate-700/50 flex place-content-center hover:bg-slate-100">
            <div id="profilePosts" aria-checked className="inline-block w-fit h-full aria-checked:border-b-2 border-cyan-600 p-2" onClick={handleClickProfile}>
              Posts
            </div>
          </div>
          <div className="dark:hover:bg-slate-700/50 flex place-content-center hover:bg-slate-100">
            <div id="profileLikes" className="inline-block w-fit h-full aria-checked:border-b-2 border-cyan-600 p-2" onClick={handleClickProfile}>
              Me Gusta
            </div>
          </div>
        </div>
        <div className='relative'>
          {
            inPosts ? 
              userPosts.map(post => <Posts key={post.id} type='posts' post={post} user={user}></Posts>)
              :
              userPostsLiked.map(post => users.map( userMap => userMap.id === post.user ? <Posts key={post.id} type='posts' post={post} user={userMap} /> : false )).concat(
                userRepliesLiked.map(reply => users.map( userMap => userMap.id === reply.user ? <Posts key={reply.id} type='replies' post={reply} user={userMap} /> : false ))
              )
          }
          {}
        </div>
      </div>
      :
      false
  )
}