import { useEffect, useState } from "react"
import { collection, getDocs, query, where, getDoc, doc} from "firebase/firestore"
import { db, storage } from '../services/firebaseConfig'
import { getDownloadURL, ref } from "firebase/storage"

export function useUserPosts(userID) {
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState('')
  const [userPostsLiked, setUserPostsLiked] = useState([])
  const [userRepliesLiked, setUserRepliesLiked] = useState([])

  const getPosts = async () => {
    const q = query(collection(db, 'posts'), where('user', '==', userID))
    const querySnapshot = await getDocs(q)
    const postList = []

    querySnapshot.forEach(async doc => {
      const dataRaw = doc.data()

      if(dataRaw.pics){
        const picURL = await getDownloadURL(ref(storage, `pics/${doc.id}`))
        const postData = {id: doc.id, ...dataRaw, picURL: picURL}
        postList.push(postData)
      }else if(!dataRaw.pics){
        const postData = {id: doc.id, ...dataRaw}
        postList.push(postData)
      }
    })
    postList.sort(function(a, b){
      return b.timestamp.seconds - a.timestamp.seconds
    })
    setUserPosts(postList)  
  }

  const getPostsLiked = async () => {
    const queryPosts = query(collection(db, 'posts'), where('likes', 'array-contains', userID))
    const queryReplies = query(collection(db, 'replies'), where('likes', 'array-contains',userID))

    const querySnapshotPosts = await getDocs(queryPosts)
    const querySnapshotReplies = await getDocs(queryReplies)

    const postList = []
    const replyList = []

    querySnapshotPosts.forEach(async doc => {
      const dataRaw = doc.data()

      if(dataRaw.pics){
        const picURL = await getDownloadURL(ref(storage, `pics/${doc.id}`))
        const postData = {id: doc.id, ...dataRaw, picURL: picURL}
        postList.push(postData)
      }else if(!dataRaw.pics){
        const postData = {id: doc.id, ...dataRaw}
        postList.push(postData)
      }
      
    })
    postList.sort(function(a, b){
      return b.timestamp.seconds - a.timestamp.seconds
    })

    querySnapshotReplies.forEach(async doc => {
      const dataRaw = doc.data()

      if(dataRaw.pics){
        const picURL = await getDownloadURL(ref(storage, `pics/${doc.id}`))
        const replyData = {id: doc.id, ...dataRaw, picURL: picURL}
        replyList.push(replyData)
      }else if(!dataRaw.pics){
        const replyData = {id: doc.id, ...dataRaw}
        replyList.push(replyData)
      }
    })
    replyList.sort(function(a, b){
      return b.timestamp.seconds - a.timestamp.seconds
    })
    setUserPostsLiked(postList)
    setUserRepliesLiked(replyList)
  }

  const getUser = async () => {
    const collectionUsers = collection(db,'users')
    const docRef = doc(collectionUsers, userID)

    getDoc(docRef).then(user => {
      setUser({...user.data(), id: user.id})
    })
  }


  useEffect(()=> {
    getPosts()
    getUser()
    getPostsLiked()
  }, [userID])

return{
    userPosts,
    user,
    userPostsLiked,
    userRepliesLiked
  }
}