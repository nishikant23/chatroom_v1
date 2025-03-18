
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { MessageRoom } from './pages/MessageRoom'
import { Home } from './pages/Home'



function App() {
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<MessageRoom/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
