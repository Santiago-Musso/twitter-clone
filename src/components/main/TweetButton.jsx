import { collection, addDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"

export function TweetButton(props){
  const sendTwitt = () => {
    const user = props.user.uid
    const tweet = props.tweet

    tweet !== '' 
    ? addDoc(collection(db, 'posts'), {
      user: user, 
      tweet: tweet,
    }).then(() => window.location.reload())
    : false
  }

  return (
    <div className="flex place-content-between border-t p-2 dark:border-slate-700">
      <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"></button>
      <button className="bg-sky-600 hover:bg-sky-400 px-3 py-1 rounded-full text-white font-semibold block" onClick={sendTwitt}>Twittear</button>
    </div>
  )
}