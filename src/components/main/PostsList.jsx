import { useEffect, useState } from "react"
import { Posts } from './Posts'
import { collection, getDocs} from "firebase/firestore"
import { db } from '../../services/firebaseConfig'

export function PostsList(){

const [mainPosts, setMainPosts] = useState([])
const [users, setUsers] = useState([])

const getPosts = async () => {

  const querySnapshot = await getDocs(collection(db, 'posts'))
  const postList = []

  querySnapshot.forEach(doc => {
    const postData = {id: doc.id, ...doc.data()}
    postList.push(postData)
  })
  
  setMainPosts(postList)  
}

const getUsers = async() => {
  const querySnapshot = await getDocs(collection(db, 'users'))
  const userList = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  setUsers(userList)
}

useEffect(() => {
  getPosts()
  getUsers()
},[])

return mainPosts.map(post => users.map(user => user.id === post.user ? <Posts key={post.id} user={user} post={post}></Posts> : false) )

}