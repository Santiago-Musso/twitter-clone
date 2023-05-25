import { useEffect, useState } from "react"
import { Posts } from './Posts'
import { collection, getDocs, getDoc, doc} from "firebase/firestore"
import { db } from '../../services/firebaseConfig'

export function RepliesList(props){

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

useEffect(() => {
  getReplies()
  getUsers()
},[])

return (
  props.replies ?
   props.replies.map(replyProps => replies.map(reply => users.map(user => user.id === reply.user && replyProps == reply.id ?
    <Posts key={reply.id} user={user} post={reply} type='reply'/> : false))) : false
)

}