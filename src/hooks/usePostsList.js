import { useEffect, useState } from "react"
import { collection, getDocs} from "firebase/firestore"
import { db } from '../services/firebaseConfig'

export function usePostsLists() {
  const [mainPosts, setMainPosts] = useState([])
  const [users, setUsers] = useState([])

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    const postList = []

    querySnapshot.forEach(doc => {
      const postData = {id: doc.id, ...doc.data()}
      postList.push(postData)
    })
    postList.sort(function(a, b){
      return b.timestamp.seconds - a.timestamp.seconds
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

  useEffect(()=> {
    getPosts()
    getUsers()
  }, [])

return{
    mainPosts,
    users
  }
}