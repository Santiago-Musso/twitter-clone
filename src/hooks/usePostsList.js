import { useEffect, useState } from "react"
import { collection, getDocs} from "firebase/firestore"
import { db, storage } from '../services/firebaseConfig'
import { getDownloadURL, ref } from "firebase/storage"

export function usePostsLists() {
  const [mainPosts, setMainPosts] = useState([])
  const [users, setUsers] = useState([])

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    const postList = []

    for(const doc of querySnapshot.docs){
      const rawData = doc.data()
      if(rawData.pics){
        postList.push({
            id: doc.id,
            ...rawData,
            picURL : await getDownloadURL(ref(storage, `pics/${doc.id}`))
        })
      }else if(!rawData.pics){
        postList.push({
          id: doc.id,
          ...rawData
        })
      }
    }

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