export function TweetButton(){
  return (
    <div className="flex place-content-between border-t p-2 dark:border-slate-700">
      <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Upload image</span>
      </button>
      <button className="bg-sky-600 hover:bg-sky-400 px-3 py-1 rounded-full text-white font-semibold block">Twittear</button>
    </div>
  )
}