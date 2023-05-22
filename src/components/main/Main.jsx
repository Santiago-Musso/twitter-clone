import { NewTweet } from "./NewTweet"
import { PostsList } from "./PostsList"


export default function Main(props) {
  return (
    <div className="border-l-2 dark:bg-slate-800 dark:border-slate-700">
      <h2 className="sticky top-0 z-50 pt-3 pb-6 pl-4 font-bold text-xl bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 max-w-xl border-b border-r">Inicio</h2>
      <div className='relative'>
        <NewTweet user={props.user}/>
        <PostsList />
      </div>
    </div>
  )
}