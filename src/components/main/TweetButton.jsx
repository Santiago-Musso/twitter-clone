import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"

export function TweetButton(props){
  const sendTwitt = () => {
    const user = props.user.uid
    const tweet = props.tweet

    const updateTweet = async () => {
      const docRef = await addDoc(collection(db, props.type), {
        user: user, 
        tweet: tweet,
        timestamp: new Date(),
        replies: [],
        likes:0
      })
      
      if(props.type === 'replies'){
        const newTweetRef = doc(db, "posts", props.tweetID)
        await updateDoc(newTweetRef, {replies: arrayUnion(docRef.id)})   
      }
    }

    tweet !== '' ? 
    updateTweet().then(() => window.location.reload())
    : false
  }

  return (
    <div className="flex place-content-between border-t p-2 dark:border-slate-700">
      <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"></button>
      <button className="bg-sky-600 hover:bg-sky-400 px-3 py-1 rounded-full text-white font-semibold block" onClick={sendTwitt}>Twittear</button>
    </div>
  )
}