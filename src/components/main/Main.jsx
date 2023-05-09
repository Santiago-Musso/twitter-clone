import { useEffect } from "react";
import { NewTweet } from "./NewTweet";
import { Posts } from "./Posts";
import { db } from '../../services/firebaseConfig'
import { collection, getDocs } from "firebase/firestore";


export default function Main() {

  const prueba = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  useEffect(() => {
    prueba()
  }, [])

  return (
    <div className="border-l-2 dark:bg-slate-800 dark:border-slate-700">
      <h2 className="sticky top-0 z-50 pt-3 pb-6 pl-4 font-bold text-xl bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 max-w-xl border-b border-r">Inicio</h2>
      <div className='relative'>
        <NewTweet />
        <Posts />
      </div>
    </div>
  )
}