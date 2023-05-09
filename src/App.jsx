import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Main from './components/main/Main'
import { TweetDetail } from './components/main/TweetDetail'

function App() {
  return (
    <BrowserRouter>
      <div id='app'>
        <div className='w-screen h-screen dark:bg-slate-800'>
          <div className='grid grid-cols-[0.3fr_0.7fr]'>
            <Header />
            <Routes>
              <Route exact path='/' element={<Main />} />
              <Route exact path='/post/:id' element={<TweetDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>

  )
}

export default App
