import { Link } from "react-router-dom"
import { requestToken } from '../../services/resquestToken'
import { useEffect, useState } from "react"
import { logOut } from "../../services/requestLogOut"

export default function Header(props) {
  const [isAuth, setIsAuth] = useState(false)

  const handleDarkMode = () => {
    const darkThemeButton = document.getElementById('dark-theme-button')
    const lightThemeButton = document.getElementById('light-theme-button')
    const appMain = document.getElementById('app')

    appMain.classList.toggle('dark')
    lightThemeButton.classList.toggle('hidden')
    darkThemeButton.classList.toggle('hidden')
  }

  useEffect(()=>{
    props.user != null ? setIsAuth(true) : setIsAuth(false)
  }, [props.user]) 

  return (
    <div className="object-contain sticky top-0 z-50 dark:bg-slate-800 dark:text-white">
      <ul className="max-w-min m-auto">
          <li>
            <Link to='/'>
              <div className="max-w-min text-xl font-normal">
                <span className="flex flex-row gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 p-4 rounded-full cursor-pointer">
                  <svg width="24px" height="24px" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke='#00acee' className="hover:fill-sky-500"><path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="#00acee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </span>
              </div>
            </Link>
          </li>
        {
          isAuth ?
          <>
            <li>
              <Link to='/'>
                <div className="max-w-min text-xl font-normal">
                  <span className="flex flex-row gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 p-4 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
                    Inicio
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <div className="max-w-min text-xl font-normal">
                <span className="flex flex-row gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 p-4 rounded-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path></svg>
                  Guardados
                </span>
              </div>
            </li>

            <li>
              <div className="max-w-min text-xl font-normal">
                <span className="flex flex-row gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 p-4 rounded-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Perfil
                </span>
              </div>
            </li>
            <li>
              <div className="max-w-min text-xl font-normal">
                <span className="flex flex-row gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 p-4 rounded-full cursor-pointer" onClick={logOut}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Salir
                </span>
              </div>
            </li>
          </> :
            <li>
              <div className="max-w-min text-xl font-normal">
                <span className="flex flex-row gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 p-4 rounded-full cursor-pointer" onClick={requestToken}>
                <svg strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="w-6 h-6"><path d="M19 12h-7m0 0l3 3m-3-3l3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                Ingresar
                </span>
              </div>
            </li>
        }
        <li>
          <span className="flex flex-row gap-4 p-4 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full cursor-pointer max-w-min" onClick={handleDarkMode}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 hover:fill-black" id="dark-theme-button">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-white hidden" id='light-theme-button'>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </span>
        </li>
      </ul>
    </div>
  )
}