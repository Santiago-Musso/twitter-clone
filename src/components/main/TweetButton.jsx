import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db, storage } from "../../services/firebaseConfig"
import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import { ref, uploadBytes } from "firebase/storage"

export function TweetButton({type, tweet, replyTweetID, replyTweetType}){
  const user = useContext(UserContext)
  const [file, setFile] = useState(false)

  const sendTweet = async() => {
    const updateTweet = async () => {
      //Guarda un nuevo tweet dependiendo el tipo
      const docRef = await addDoc(collection(db, type), {
        user: user.uid, 
        tweet: tweet,
        timestamp: new Date(),
        replies: [],
        likes:[],
        pics: file ? true : false
      })
      // Si es del tipo replies tambien lo guarda en el post donde se hizo
      if(type === 'replies'){
        const newTweetRef = doc(db, replyTweetType, replyTweetID)
        await updateDoc(newTweetRef, {replies: arrayUnion(docRef.id)})   
      }
      if(file){
        const storageRef = ref(storage,`pics/${docRef.id}`)
        await uploadBytes(storageRef, file)
      }
    }
    //Dependiendo si el tweet esta vacio ejecuta la funcion
    tweet !== '' || file ? 
    updateTweet().then(() => window.location.reload())
    : false
  }
  return (
    <div className="flex place-content-between border-t p-2 dark:border-slate-700 relative">
      <input type="file"  onChange={e => setFile(e.target.files[0])} hidden accept="image/*" multiple={false} />
      <div onClick={(e) => e.target.parentElement.firstChild.click()} className="flex p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
        <svg aria-hidden="true" className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path className="pointer-events-none" fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
        </svg>
        <p className="text-sm text-center">{file ? file.name : false}</p>
      </div>
      <button className="bg-sky-600 hover:bg-sky-400 px-3 py-1 rounded-full text-white font-semibold block" onClick={sendTweet}>Twittear</button>
    </div>
  )
}