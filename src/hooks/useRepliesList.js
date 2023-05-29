import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from '../services/firebaseConfig'

export function useRepliesLists() {
  const [users, setUsers] = useState([])
  const [replies, setReplies] = useState([])

  const getReplies = async () => {
    const querySnapshot = await getDocs(collection(db, 'replies'))
    const replyList = []

    querySnapshot.forEach(doc => {
      const postData = {id: doc.id, ...doc.data()}
      replyList.push(postData)
    })
    
    setReplies(replyList)
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
    getReplies()
    getUsers()
  }, [])

  return{
    users,
    replies
  }
}