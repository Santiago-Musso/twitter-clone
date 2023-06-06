import { useState, useEffect } from "react"
import { db } from "../services/firebaseConfig"
import { getDoc, collection, doc } from "firebase/firestore"
import { storage } from "../services/firebaseConfig"
import { getDownloadURL, ref } from "firebase/storage"

export function usePosts(type='replies', id) {
  const [post, setPost] = useState({})
  const [user, setUser] = useState('')
  const [replies, setReplies] = useState([])
  const [timestamp, setTimestamp] = useState(null)

  const getUser = async (uid) => {
    const collectionUsers = collection(db,'users')
    const docRef = doc(collectionUsers, uid)

    getDoc(docRef).then(user => {
      setUser({...user.data(), id: user.id})
    })
  }

  const getPost = async () => {
    const collectionPosts = collection(db,type)
    const docRef = doc(collectionPosts, id)

    await getDoc(docRef).then(async post => {
      const dataRaw = post.data()

      if(dataRaw.pics){
        const picURL = await getDownloadURL(ref(storage, `pics/${post.id}`))
        setPost({...dataRaw, picURL: picURL})
        getUser(dataRaw.user)
        setReplies(dataRaw.replies)
        setTimestamp(setTweetTime(dataRaw.timestamp))
      }else if(!dataRaw.pics){
        setPost({...dataRaw})
        getUser(dataRaw.user)
        setReplies(dataRaw.replies)
        setTimestamp(setTweetTime(dataRaw.timestamp))
      }
    })
  }

  const setTweetTime = (timestamp) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
    return timestamp.toDate().toLocaleDateString('es-ES', options)
  } 

  useEffect(() => {
    getPost()
  }, [id])

  return{
    post,
    user,
    replies,
    timestamp
  }
}