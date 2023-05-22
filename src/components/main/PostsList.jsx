import { useEffect, useState } from "react"
import { Posts } from './Posts'
import { collection, getDocs} from "firebase/firestore"
import { db } from '../../services/firebaseConfig'

export function PostsList(){

const [mainPosts, setMainPosts] = useState([])

const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'))
  const postList = []

  querySnapshot.forEach(doc => {
    const postData = {id: doc.id, ...doc.data()}
    postList.push(postData)
  })

  setMainPosts(postList)  
}

useEffect(() => {
  getPosts()
},[])

  return mainPosts.map(post => <Posts key={post.id}>{post}</Posts>)
}