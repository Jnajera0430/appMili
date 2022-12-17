

import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './Formulario/DatosPersonales/Form'
import Admin from './Admin/admin'
import { Login } from './components/Login'
import { SingUp } from './components/SingUp'
import {ProtectedRoute} from './RouteProtected'
import {RouteProtectedIsLogin} from './RouteProtectedIsLogin'
import { useDispatch } from 'react-redux'
import {getUserIsAllowed} from './features/appMili/appmiliSlice'

function App() {
  const dispatch = useDispatch();
  
  
  const [user, setUser] = useState({
    email:null,
    password: null,
    rol:null
  });
  /* function setuser(uservalid){
    setUser(uservalid);
    return
  }
  console.log(!!user.email); */
  
  return (
    <BrowserRouter>
      
      <Routes >
        <Route element={<RouteProtectedIsLogin isAllowed={!!user.email } redirectTo={!!user.rol =='EMPLOYED'?'/user':'/admin'}/>}>
            <Route index element={<Login />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SingUp/>}/>
        </Route> 
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
