import { useState, useContext } from 'react'
import { ProfileImage } from './ProfileImage'
import { TweetButton } from './TweetButton'
import { UserContext } from '../../context/userContext'

export function NewTweet () {
  const [tweetText, setTweetText] = useState('')
  const user = useContext(UserContext)

  //Setea el estado del nuevo tweet
  const handleChangeTweet = (e) => {
    const textRaw = e.target.value
    setTweetText(textRaw)
  }
  return user !== null
    ?
      <div className="max-w-xl border-b border-r p-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
        <div className="grid grid-cols-[auto_1fr] gap-5">
          <ProfileImage src={user.photoURL} to={user.uid}/>
          <div className="max-w-xl">
            <div>
              <textarea placeholder='Que esta pasando?' className="resize-none text-lg w-full dark:bg-slate-800" style={{ overflow: 'hidden' }} onChange={handleChangeTweet} value={tweetText} />
            </div>
            <TweetButton tweet={tweetText} type='posts'/>
          </div>
        </div>
      </div>
    : 
      <div></div>
}
