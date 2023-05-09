import { ProfileImage } from './ProfileImage'
import { TweetButton } from './TweetButton'

export function NewTweet () {
  return (
    <div className="max-w-xl border-b border-r p-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
      <div className="grid grid-cols-[auto_1fr] gap-5">
        <ProfileImage src='https://pbs.twimg.com/profile_images/1450284391964446720/fJ_cDXvP_400x400.jpg' />
        <div className="max-w-xl">
          <div>
            <textarea placeholder='Que esta pasando?' className="resize-none text-lg w-full dark:bg-slate-800" style={{ overflow: 'hidden' }} />
          </div>
          <TweetButton />
        </div>
      </div>
    </div>
  )
}
