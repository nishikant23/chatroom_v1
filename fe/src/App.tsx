
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ChatBox } from './components/ChatBox'
import { JoinRoom } from './components/JoinRoom'
import { useEffect, useState } from 'react'


function App() {
  const [ roomObj, setRoomObj ] = useState<object | null>(null);
  // useEffect(() => {
  //   const messageArray = localStorage.getItem('messages');
  //   const parsedMsgArray = messageArray ? JSON.parse(messageArray) : null;
  
  // if(parsedMsgArray) {
  //   //@ts-ignore
  //   parsedMsgArray.forEach(element => {
  //     console.log("Local storage Messages array " + element.id +" " + element.message+" " + element.username+" " + element.roomId)
  //   });
  // }
  // },[])
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JoinRoom setRoomObj={setRoomObj}/>}/>
          <Route path='/chat' 
          //@ts-ignore
          element={<ChatBox roomObj={roomObj }/>}/>
          {/* || JSON.parse(localStorage.getItem('roomObj')) */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
