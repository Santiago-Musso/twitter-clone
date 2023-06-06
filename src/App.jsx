import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Main from './components/main/Main'
import { TweetDetail } from './components/main/TweetDetail'
import { UserContext } from './context/userContext'
import Profile from './components/main/Profile'
import { useContext } from 'react'

function App() {
  const user = useContext(UserContext)

  return (
    <BrowserRouter>
      <div id='app' className='w-full h-full dark:bg-slate-800'>
        <div className='w-screen h-screen dark:bg-slate-800'>
          <div className='dark:bg-slate-800 grid grid-cols-[0.3fr_0.7fr]'>
            <Header/>
            <Routes>
              <Route exact path='/' element={<Main/>} />
              <Route exact path='/posts/:id' element={<TweetDetail type='posts'/>} />
              <Route exact path='/replies/:id' element={<TweetDetail type='replies'/>} />
              <Route exact path='/user/:id' element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
