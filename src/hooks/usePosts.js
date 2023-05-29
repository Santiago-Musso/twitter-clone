import { useState, useEffect } from "react"
import { db } from "../services/firebaseConfig"
import { getDoc, collection, doc } from "firebase/firestore"

export function usePosts(type='replies', id) {
  const [post, setPost] = useState({})
  const [user, setUser] = useState('')
  const [replies, setReplies] = useState([])
  const [timestamp, setTimestamp] = useState(null)

  const getUser = async (uid) => {
    const collectionUsers = collection(db,'users')
    const docRef = doc(collectionUsers, uid)

    getDoc(docRef).then(user => {
      setUser(user.data())
    })
  }

  const getPost = async () => {
    const collectionPosts = collection(db,type)
    const docRef = doc(collectionPosts, id)

    await getDoc(docRef). then(post => {
      setPost(post.data())
      getUser(post.data().user)
      setReplies(post.data().replies)
      setTimestamp(setTweetTime(post.data().timestamp))
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