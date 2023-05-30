import { db } from "../../services/firebaseConfig"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
let i = 0

export function LikeButton ({ id, type, likes=[]}){
  const [like, setLike] = useState({stroke:'currentColor', fill:'none',isLiked : false})
  const user = useUser()
  useEffect(()=> {
    //Setea los likes en los posts segun el usuario loggeado
    user ?
      likes.map(userLikeID => {
        if(userLikeID === user.uid){
          setLike({fill: '#ef4444', stroke:'#ef4444',isLiked : true})
        }
      })
      :
      false
  }, [user, likes])

  const handleLikeClick = async () => {
    //Si no esta likeado lo likea y guarda en la bdd
    //Si esta likeado le quita el like y lo saca de la bdd
    if(!like.isLiked){
      const likeTweetRef = doc(db, type, id)
      await updateDoc(likeTweetRef, {likes: arrayUnion(user.uid)})
      setLike({fill: '#ef4444', stroke:'#ef4444',isLiked : true})  
    }else if(like.isLiked){
      const likeTweetRef = doc(db, type, id)
      await updateDoc(likeTweetRef, {likes: arrayRemove(user.uid)})
      setLike({fill: 'none', stroke:'currentColor',isLiked : false})
    }
  }

  return (
    <span className="p-1 rounded-full hover:bg-red-500/30 max-w-min z-20" onClick={handleLikeClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} className="svgLike w-4 h-4 hover:text-red-500" stroke={like.stroke} fill={like.fill}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </span>
  )
}