import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export function TweetButton(props){
  const user = useContext(UserContext)

  const sendTweet = async() => {

    const updateTweet = async () => {
      const docRef = await addDoc(collection(db, props.type), {
        user: user.uid, 
        tweet: props.tweet,
        timestamp: new Date(),
        replies: [],
        likes:0
      })

      if(props.type === 'replies'){
        const newTweetRef = doc(db, "posts", props.replyTweetID)
        await updateDoc(newTweetRef, {replies: arrayUnion(docRef.id)})   
      }
    }

    props.tweet !== '' ? 
    updateTweet().then(() => window.location.reload())
    : false
  }

  return (
    <div className="flex place-content-between border-t p-2 dark:border-slate-700">
      <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"></button>
      <button className="bg-sky-600 hover:bg-sky-400 px-3 py-1 rounded-full text-white font-semibold block" onClick={sendTweet}>Twittear</button>
    </div>
  )
}