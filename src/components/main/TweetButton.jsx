import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export function TweetButton({type, tweet, replyTweetID}){
  const user = useContext(UserContext)

  const sendTweet = async() => {
    const updateTweet = async () => {
      //Guarda un nuevo tweet dependiendo el tipo
      const docRef = await addDoc(collection(db, type), {
        user: user.uid, 
        tweet: tweet,
        timestamp: new Date(),
        replies: [],
        likes:[]
      })
      // Si es del tipo replies tambien lo guarda en el post donde se hizo
      if(type === 'replies'){
        const newTweetRef = doc(db, "posts", replyTweetID)
        await updateDoc(newTweetRef, {replies: arrayUnion(docRef.id)})   
      }
    }
    //Dependiendo si el tweet esta vacio ejecuta la funcion
    tweet !== '' ? 
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