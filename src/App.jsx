

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { Login } from './components/Login'
import { SingUp } from './components/SingUp'
import {ProtectedRoute} from './RouteProtected'
function App() {
  const [user, setUser] = useState(null);
  const setuser = (uservalid)=>{
    setUser(uservalid);
  }
  console.log(!!user);
  return (
    <BrowserRouter>
      
      <Routes >
        
        <Route element={<ProtectedRoute isAllowed={!!user && (user.rol =='EMPLOYED' || user.rol =='ADMIN')} redirectTo='/'/>}>
          <Route index element={<Login/>}/>
          <Route index path='/login' element={<Login setuser={setuser}/>}/>
          <Route path='/signup' element={<SingUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
