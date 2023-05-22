import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Main from './components/main/Main'
import { TweetDetail } from './components/main/TweetDetail'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

function App() {
  const auth = getAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (userLog) => {
      if (userLog) {
        setUser(userLog)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <div id='app'>
        <div className='w-screen h-screen dark:bg-slate-800'>
          <div className='grid grid-cols-[0.3fr_0.7fr]'>
            <Header user={user}/>
            <Routes>
              <Route exact path='/' element={<Main user={user} />} />
              <Route exact path='/post/:id' element={<TweetDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>

  )
}

export default App
