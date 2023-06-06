import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProfileImage } from './ProfileImage'
import { TweetButton } from './TweetButton'
import { useUser } from '../../hooks/useUser'

export function NewReply({ postID, type }) {
  const [tweetText, setTweetText] = useState('')
  const user = useUser()
  const { id } = useParams()


  //Setea el estado de la nueva respuesta
  const handleChangeTweet = (e) => {
    const textRaw = e.target.value
    setTweetText(textRaw)
  }
  return user
    ?
      <div className="max-w-xl border-b border-r p-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
        <div className="grid grid-cols-[auto_1fr] gap-5">
          <ProfileImage src={user.photoURL} to={user.uid}/>
          <div className="max-w-xl">
            <div>
              <textarea placeholder='Twittea tu respuesta' className="resize-none text-lg w-full dark:bg-slate-800" style={{ overflow: 'hidden' }} onChange={handleChangeTweet} value={tweetText} />
            </div>
            <TweetButton tweet={tweetText} type='replies' replyTweetType={ type || 'posts'} replyTweetID={ postID || id }/>
          </div>
        </div>
      </div>
    : 
      <div></div>
}