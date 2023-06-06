import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db, storage } from '../services/firebaseConfig'
import { getDownloadURL, ref } from "firebase/storage"

export function useRepliesLists() {
  const [users, setUsers] = useState([])
  const [replies, setReplies] = useState([])

  const getReplies = async () => {
    const querySnapshot = await getDocs(collection(db, 'replies'))
    const replyList = []

    querySnapshot.forEach(async doc => {
      const dataRaw = doc.data()
      let postData = {}

      if(dataRaw.pics){
        const picURL = await getDownloadURL(ref(storage, `pics/${doc.id}`))
        postData = {id: doc.id, ...dataRaw, picURL: picURL}
      }else if(!dataRaw.pics){
        postData = {id: doc.id, ...dataRaw}
      }
      replyList.push(postData)
    })
    replyList.sort(function(a, b){
      return b.timestamp.seconds - a.timestamp.seconds
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