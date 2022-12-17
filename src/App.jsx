

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './Formulario/DatosPersonales/Form'
import Admin from './Admin/admin'
import { Login } from './components/Login'
import { SingUp } from './components/SingUp'
import {ProtectedRoute} from './RouteProtected'

function App() {
  const [user, setUser] = useState(null);
  function setuser(uservalid){
    setUser(uservalid);
    return
  }
  console.log(!!user);
  return (
    <BrowserRouter>
      
      <Routes >
        
          <Route index element={<Login setuser={setuser}/>}/>
          <Route index path='/login' element={<Login setuser={setuser}/>}/>
          <Route path='/signup' element={<SingUp/>}/>
          <Route element={<ProtectedRoute isAllowed={!!user && user.rol =='EMPLOYED'} redirectTo='/'/>}>
            <Route path='/user' element={<Form/>}/>
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!user && user.rol =='ADMIN'} redirectTo='/'/>}>
            <Route path='/admin' element={<Admin/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
