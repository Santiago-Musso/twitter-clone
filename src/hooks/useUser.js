import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../services/firebaseConfig'

export function useUser () {

  const auth = getAuth()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    onAuthStateChanged(auth, async(userLog) => {
      if (userLog) {
        setUser(userLog)
        
        await setDoc(doc(db, "users", userLog.uid), {
          name: userLog.displayName,
          username: /^([^]+)@/.exec(userLog.email)[1],
          photo: userLog.photoURL
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}
