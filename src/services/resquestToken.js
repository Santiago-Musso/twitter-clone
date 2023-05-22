import { getAuth, signInWithRedirect } from "firebase/auth"
import { app } from "./firebaseConfig"
import { provider } from "./googleProvider"

export function requestToken(){
  const auth = getAuth(app)

  signInWithRedirect(auth, provider)
}