import { getAuth, signOut } from "firebase/auth"

export function logOut() {
  const auth = getAuth()
  
  signOut(auth).then(() => {
  }).catch((error) => {
    console.error(error)
  })
}
